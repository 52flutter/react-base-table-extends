import { FixedSizeGrid, VariableSizeGrid } from 'react-window';

const getRowStartIndexForOffset = ({ rowHeight, rowCount }, scrollTop) =>
  Math.max(0, Math.min(rowCount - 1, Math.floor(scrollTop / rowHeight)));

const getRowStopIndexForStartIndex = (
  { rowHeight, rowCount, height },
  startIndex,
  scrollTop,
) => {
  const top = startIndex * rowHeight;
  const numVisibleRows = Math.ceil((height + scrollTop - top) / rowHeight);
  return Math.max(
    0,
    Math.min(
      rowCount - 1,
      startIndex + numVisibleRows - 1, // -1 is because stop index is inclusive
    ),
  );
};

export default class Index extends FixedSizeGrid {
  _getVerticalRangeToRender() {
    const {
      columnCount,
      overscanCount,
      overscanRowCount,
      overscanRowsCount,
      rowCount,
    } = this.props;
    const { isScrolling, verticalScrollDirection, scrollTop } = this.state;
    const { overscanRowAlways } = this.props;

    const overscanCountResolved =
      overscanRowCount || overscanRowsCount || overscanCount || 1;

    if (columnCount === 0 || rowCount === 0) {
      return [0, 0, 0, 0];
    }

    const startIndex = getRowStartIndexForOffset(
      this.props,
      scrollTop,
      this._instanceProps,
    );
    const stopIndex = getRowStopIndexForStartIndex(
      this.props,
      startIndex,
      scrollTop,
      this._instanceProps,
    );

    // Overscan by one item in each direction so that tab/focus works.
    // If there isn't at least one extra item, tab loops back around.
    const overscanBackward =
      overscanRowAlways === true ||
      !isScrolling ||
      verticalScrollDirection === 'backward'
        ? Math.max(1, overscanCountResolved)
        : 1;
    const overscanForward =
      overscanRowAlways === true ||
      !isScrolling ||
      verticalScrollDirection === 'forward'
        ? Math.max(1, overscanCountResolved)
        : 1;

    return [
      Math.max(0, startIndex - overscanBackward),
      Math.max(0, Math.min(rowCount - 1, stopIndex + overscanForward)),
      startIndex,
      stopIndex,
    ];
  }
}
