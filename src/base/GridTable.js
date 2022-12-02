import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { FixedSizeGrid, VariableSizeGrid } from './window';
import memoize from 'memoize-one';
import Header from './TableHeader';
import { getEstimatedTotalRowsHeight, isObjectEqual } from './utils';

/**
 * A wrapper of the Grid for internal only
 */
class GridTable extends React.PureComponent {
  constructor(props) {
    super(props);

    this._setDivBodyRef = this._setDivBodyRef.bind(this);
    this._setFooterRef = this._setFooterRef.bind(this);
    this._setHeaderRef = this._setHeaderRef.bind(this);
    this._setBodyRef = this._setBodyRef.bind(this);
    this._setInnerRef = this._setInnerRef.bind(this);
    this._itemKey = this._itemKey.bind(this);
    this._getBodyWidth = this._getBodyWidth.bind(this);
    this._handleItemsRendered = this._handleItemsRendered.bind(this);
    this._resetColumnWidthCache = memoize((bodyWidth) => {
      if (!this.props.estimatedRowHeight) return;
      this.bodyRef && this.bodyRef.resetAfterColumnIndex(0, false);
    });
    this._getEstimatedTotalRowsHeight = memoize(getEstimatedTotalRowsHeight);

    this.renderRow = this.renderRow.bind(this);

    this.lastScrollArgs = {};
  }
  componentWillUnmount() {
    this._resetColumnWidthCache.clear();
    this._getEstimatedTotalRowsHeight.clear();
  }

  resetAfterRowIndex(rowIndex = 0, shouldForceUpdate) {
    if (!this.props.estimatedRowHeight) return;
    this.bodyRef &&
      this.bodyRef.resetAfterRowIndex(rowIndex, shouldForceUpdate);
  }

  forceUpdateTable() {
    this.headerRef && this.headerRef.forceUpdate();
    this.footerRef && this.footerRef.forceUpdate();
    this.bodyRef && this.bodyRef.forceUpdate();
  }

  scrollToPosition(args) {
    this.headerRef && this.headerRef.scrollTo(args.scrollLeft);
    this.footerRef && this.footerRef.scrollTo(args.scrollLeft);
    if (isObjectEqual(this.lastScrollArgs, args)) {
      return;
    }
    if (this.divBodyRef) {
      this.divBodyRef.scrollTop = args.scrollTop;
      this.divBodyRef.scrollLeft = args.scrollLeft;
    } else {
      this.bodyRef && this.bodyRef.scrollTo(args);
    }
    this.lastScrollArgs = { ...this.lastScrollArgs, ...args };
  }

  scrollToTop(scrollTop) {
    if (this.lastScrollArgs && this.lastScrollArgs.scrollTop === scrollTop) {
      return;
    }
    this.lastScrollArgs = { ...this.lastScrollArgs, scrollTop };

    if (this.divBodyRef) {
      this.divBodyRef.scrollTop = scrollTop;
    } else {
      this.bodyRef && this.bodyRef.scrollTo({ scrollTop });
    }
  }

  scrollToLeft(scrollLeft) {
    this.headerRef && this.headerRef.scrollTo(scrollLeft);
    this.footerRef && this.footerRef.scrollTo(scrollLeft);
    if (this.lastScrollArgs && this.lastScrollArgs.scrollLeft === scrollLeft) {
      return;
    }
    this.lastScrollArgs = { ...this.lastScrollArgs, scrollLeft };

    if (this.divBodyRef) {
      this.divBodyRef.scrollLeft = scrollLeft;
    } else {
      this.bodyRef && this.bodyRef.scrollToPosition({ scrollLeft });
    }
  }

  scrollToRow(rowIndex = 0, align = 'auto') {
    if (!this.divBodyRef) {
      this.bodyRef && this.bodyRef.scrollToItem({ rowIndex, align });
    } else {
      let scrollTop = 0;
      const { data = [], rowHeight, estimatedRowHeight, width } = this.props;
      const newData = data
        .concat([])
        .splice(0, rowIndex > data.length ? data.length - 1 : rowIndex);
      if (estimatedRowHeight) {
        scrollTop = this._getEstimatedTotalRowsHeight(
          newData,
          estimatedRowHeight,
        );
      } else {
        scrollTop = newData.length * rowHeight;
      }
      // console.log('scrollTop', scrollTop);
      this.divBodyRef.scrollTop = scrollTop;
      if (align === 'start') {
        this.divBodyRef.scrollLeft = 0;
      } else if (align === 'center') {
        this.divBodyRef.scrollLeft = width / 2;
      } else if (align === 'end') {
        this.divBodyRef.scrollLeft = width;
      }
    }
  }

  getTotalRowsHeight() {
    const { data, rowHeight, estimatedRowHeight } = this.props;

    if (estimatedRowHeight) {
      return (
        (this.innerRef && this.innerRef.clientHeight) ||
        this._getEstimatedTotalRowsHeight(data, estimatedRowHeight)
      );
    }
    return data.length * rowHeight;
  }

  onDivScroll = (event) => {
    const { scrollLeft, scrollTop } = event.currentTarget;
    // console.log('onDivScroll', event, scrollWidth, scrollLeft, clientWidth);
    this.props.onScroll && this.props.onScroll({ scrollLeft, scrollTop });
  };

  renderRow(args) {
    const { data, columns, rowRenderer } = this.props;
    const rowData = data[args.rowIndex];
    return rowRenderer({ ...args, columns, rowData });
  }

  render() {
    const {
      containerStyle,
      classPrefix,
      className,
      data,
      frozenData,
      width,
      height,
      rowHeight,
      estimatedRowHeight,
      getRowHeight,
      headerWidth,
      bodyWidth,
      useIsScrolling,
      onScroll,
      hoveredRowKey,
      overscanRowCount,
      // omit from rest
      style,
      virtual,
      footerData,
      onScrollbarPresenceChange,
      sticky,
      ...rest
    } = this.props;
    const headerHeight = this._getHeaderHeight();
    const frozenRowCount = frozenData.length;
    const frozenRowsHeight = rowHeight * frozenRowCount;

    const footerRowsHeight = rowHeight * (footerData?.length ?? 0);
    const cls = cn(`${classPrefix}__table`, className);
    const containerProps = containerStyle ? { style: containerStyle } : null;
    const Grid = estimatedRowHeight ? VariableSizeGrid : FixedSizeGrid;

    this._resetColumnWidthCache(bodyWidth);

    let isVirtual =
      virtual === undefined ? (data.length > 100 ? true : false) : virtual;
    // isVirtual = false;
    if (
      useIsScrolling === true ||
      estimatedRowHeight ||
      this.props.onEndReached ||
      sticky
    ) {
      isVirtual = true;
    }
    return (
      <div role="table" className={cls} {...containerProps}>
        {footerData?.length > 0 && (
          // put header after body and reverse the display order via css
          // to prevent header's shadow being covered by body
          <Header
            {...rest}
            className={`${classPrefix}__footer__frozen`}
            ref={this._setFooterRef}
            data={data}
            frozenData={footerData}
            width={width}
            height={rowHeight * footerData.length}
            rowWidth={headerWidth}
            rowHeight={rowHeight}
            headerHeight={0}
            headerRenderer={this.props.headerRenderer}
            rowRenderer={this.props.rowRenderer}
            // hoveredRowKey={frozenRowCount > 0 ? hoveredRowKey : null}
          />
        )}

        {isVirtual === false ? (
          <div
            className={`${classPrefix}__body`}
            ref={this._setDivBodyRef}
            style={{
              width: width,
              height: Math.max(
                height - headerHeight - frozenRowsHeight - footerRowsHeight,
                0,
              ),
              overflowY: 'auto',
              overflowX: bodyWidth > width ? 'auto' : 'hidden',
            }}
            onScroll={this.onDivScroll}
          >
            <Grid
              {...rest}
              style={{ overflow: 'hidden' }}
              ref={this._setBodyRef}
              innerRef={this._setInnerRef}
              itemKey={this._itemKey}
              data={data}
              frozenData={frozenData}
              width={bodyWidth}
              height={this.getTotalRowsHeight()}
              rowHeight={estimatedRowHeight ? getRowHeight : rowHeight}
              estimatedRowHeight={
                typeof estimatedRowHeight === 'function'
                  ? undefined
                  : estimatedRowHeight
              }
              rowCount={data.length}
              // overscanRowCount={overscanRowCount}
              columnWidth={estimatedRowHeight ? this._getBodyWidth : bodyWidth}
              columnCount={1}
              overscanColumnCount={0}
              useIsScrolling={useIsScrolling}
              hoveredRowKey={hoveredRowKey}
              onScroll={isVirtual === false ? undefined : onScroll}
              onItemsRendered={this._handleItemsRendered}
              children={this.renderRow}
              overscanRowCount={data.length}
              // initialScrollTop={0}
            />
          </div>
        ) : (
          <Grid
            {...rest}
            className={`${classPrefix}__body`}
            ref={this._setBodyRef}
            innerRef={this._setInnerRef}
            itemKey={this._itemKey}
            data={data}
            frozenData={frozenData}
            width={width}
            height={Math.max(
              height - headerHeight - frozenRowsHeight - footerRowsHeight,
              0,
            )}
            rowHeight={estimatedRowHeight ? getRowHeight : rowHeight}
            estimatedRowHeight={
              typeof estimatedRowHeight === 'function'
                ? undefined
                : estimatedRowHeight
            }
            rowCount={data.length}
            overscanRowCount={overscanRowCount}
            columnWidth={estimatedRowHeight ? this._getBodyWidth : bodyWidth}
            columnCount={1}
            overscanColumnCount={0}
            useIsScrolling={useIsScrolling}
            hoveredRowKey={hoveredRowKey}
            onScroll={onScroll}
            onItemsRendered={this._handleItemsRendered}
            children={this.renderRow}
          />
        )}

        {headerHeight + frozenRowsHeight > 0 && (
          // put header after body and reverse the display order via css
          // to prevent header's shadow being covered by body
          <Header
            {...rest}
            className={`${classPrefix}__header`}
            ref={this._setHeaderRef}
            data={data}
            frozenData={frozenData}
            width={width}
            height={Math.min(headerHeight + frozenRowsHeight, height)}
            rowWidth={headerWidth}
            rowHeight={rowHeight}
            headerHeight={this.props.headerHeight}
            headerRenderer={this.props.headerRenderer}
            rowRenderer={this.props.rowRenderer}
            hoveredRowKey={frozenRowCount > 0 ? hoveredRowKey : null}
          />
        )}
      </div>
    );
  }

  _setDivBodyRef(ref) {
    this.divBodyRef = ref;
  }
  _setHeaderRef(ref) {
    this.headerRef = ref;
  }

  _setFooterRef(ref) {
    this.footerRef = ref;
  }

  _setBodyRef(ref) {
    this.bodyRef = ref;
  }

  _setInnerRef(ref) {
    this.innerRef = ref;
  }

  _itemKey({ rowIndex }) {
    const { data, rowKey } = this.props;
    return data[rowIndex][rowKey];
  }

  _getHeaderHeight() {
    const { headerHeight } = this.props;
    if (Array.isArray(headerHeight)) {
      return headerHeight.reduce((sum, height) => sum + height, 0);
    }
    return headerHeight;
  }

  _getBodyWidth() {
    return this.props.bodyWidth;
  }

  _handleItemsRendered({
    overscanRowStartIndex,
    overscanRowStopIndex,
    visibleRowStartIndex,
    visibleRowStopIndex,
  }) {
    this.props.onRowsRendered({
      overscanStartIndex: overscanRowStartIndex,
      overscanStopIndex: overscanRowStopIndex,
      startIndex: visibleRowStartIndex,
      stopIndex: visibleRowStopIndex,
    });
  }
}

GridTable.propTypes = {
  containerStyle: PropTypes.object,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  headerHeight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]).isRequired,
  headerWidth: PropTypes.number.isRequired,
  bodyWidth: PropTypes.number.isRequired,
  rowHeight: PropTypes.number.isRequired,
  estimatedRowHeight: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  getRowHeight: PropTypes.func,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.array.isRequired,
  frozenData: PropTypes.array,
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  useIsScrolling: PropTypes.bool,
  overscanRowCount: PropTypes.number,
  hoveredRowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  onScrollbarPresenceChange: PropTypes.func,
  onScroll: PropTypes.func,
  onRowsRendered: PropTypes.func,
  headerRenderer: PropTypes.func.isRequired,
  rowRenderer: PropTypes.func.isRequired,
};

export default GridTable;
