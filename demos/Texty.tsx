/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/sort-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import ReactDom from 'react-dom';

import { Popper } from 'react-popper';
import './texty.less';
import { checkEllipsis } from './utils';
// const modifiers: any = [
//   // {
//   //   name: 'preventOverflow',
//   //   options: {
//   //     mainAxis: true,
//   //     padding: 10,
//   //   },
//   // },
// ];
export interface ITextyProps extends React.HTMLProps<any> {
  /** 样式名 */
  className?: string;
  /**
   * 获取组件的ref 默认undefined
   */
  innerRef?: Function;
  /**
   * tooltip的渲染元素 默认div
   */
  tagName?: string;

  /**
   * 提示框内容 默认为children
   */
  tooltip?: React.ReactElement;
  /**
   *  tooltip的className
   */
  tooltipClassName?: string;
  /**
   * tooltip的Style
   */
  tooltipStyle?: React.CSSProperties;
  /**
   * tooltip的最大宽度
   */
  tooltipMaxWidth?: number;
  /**
   *  鼠标移入后 多久显示
   */
  showDelay?: number;
  /**
   * 鼠标移出后 多久隐藏
   */
  hideDelay?: number;
  /**
   * 箭头的className
   */
  arrowClassName?: string;
  /**
   *  隐藏箭头
   */
  hideArrow?: boolean;
  /**
   * tooltip位置
   */
  placement?:
    | 'auto'
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end';
  /**
   * 附加tooltip的HTML元素**在大多数情况下，您无需手动设置**
   */
  container?: any;
  /** 鼠标移出事件 */
  onMouseLeave?: (e: any) => void;
  /** 鼠标移入事件 */
  onMouseEnter?: (e: any) => void;
  auto?: boolean;
}

/**
 * 基于Popper的tooltip
 */
class Texty extends React.PureComponent<ITextyProps, any> {
  state = {
    isHovered: false,
  };

  private listenTimer: any;

  private targetNode: any;

  private hideTimer: any;

  private showTimer: any;

  componentDidUpdate() {
    if (this.state.isHovered) {
      window.addEventListener('scroll', this.handleScroll, true);
      // react - virtualized - auto - sizer would trigger scroll events after tooltip shown in some case,we have to skip those scroll events
      this.listenTimer = setTimeout(() => {
        window.removeEventListener('scroll', this.handleScroll, true);
        window.addEventListener('scroll', this.handleScroll, true);
        delete this.listenTimer;
      }, 50);
    } else {
      this._clearListenTimer();
      window.removeEventListener('scroll', this.handleScroll, true);
    }
  }

  componentWillUnmount() {
    this._clearListenTimer();
    window.removeEventListener('scroll', this.handleScroll, true);
    this._clearShowTimer();
    this._clearHideTimer();
  }

  render() {
    /* eslint-disable no-unused-vars */
    const {
      tagName,
      children,
      placement,
      // omit the following from rest
      innerRef,
      showDelay,
      hideDelay,
      tooltip,
      tooltipClassName,
      tooltipStyle,
      tooltipMaxWidth,
      hideArrow,
      container,
      auto,
      ...rest
    } = this.props;
    /* eslint-enable no-unused-vars */
    const Tag = tagName as any;

    if (children === null || children === undefined || children === '') {
      return null;
      // return <Tag {...rest} ref={this.setTargetRef} data-texty={false} />;
    }

    const target = this.targetNode;
    const isTruncated = (!!target && checkEllipsis(target)) || auto === false;
    // const isTruncated = (!!target && target.scrollWidth > target.offsetWidth) || auto === false;
    const showTooltip = this.state.isHovered && isTruncated;

    // console.log('showTooltip', showTooltip, this.props);
    return (
      <Tag
        {...rest}
        ref={this.setTargetRef}
        data-texty={showTooltip}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {children}
        {showTooltip && (
          <Popper
            modifiers={[
              {
                name: 'preventOverflow',
                options: { padding: 10, rootBoundary: 'viewport' },
              },
              {
                name: 'offset',
                options: {
                  offset: [0, 6],
                },
              },
            ]}
            referenceElement={target}
            placement={placement}
          >
            {this.renderTooltip}
          </Popper>
        )}
      </Tag>
    );
  }

  renderTooltip = ({
    ref,
    style,
    placement,
    arrowProps,
  }: any): React.ReactPortal => {
    const {
      children,
      container,
      tooltip,
      tooltipClassName,
      tooltipStyle,
      tooltipMaxWidth,
      arrowClassName,
      hideArrow,
    } = this.props;
    const content = tooltip || children;
    const extraStyle = tooltipMaxWidth
      ? { ...tooltipStyle, maxWidth: tooltipMaxWidth }
      : tooltipStyle;
    return ReactDom.createPortal(
      <div
        ref={ref}
        data-texty-tooltip={placement}
        className={tooltipClassName}
        style={extraStyle ? { ...style, ...extraStyle } : style}
        onClick={this.handleMouseEvent}
        onDoubleClick={this.handleMouseEvent}
        onContextMenu={this.handleMouseEvent}
        onMouseDown={this.handleMouseEvent}
        onMouseUp={this.handleMouseEvent}
      >
        {content}
        {!hideArrow && (
          <div
            ref={arrowProps.ref}
            data-texty-arrow={placement}
            className={arrowClassName}
            style={arrowProps.style}
          />
        )}
      </div>,
      container || this.targetNode.ownerDocument.body,
    );
  };

  setTargetRef = (ref: any) => {
    this.props.innerRef && this.props.innerRef(ref);
    this.targetNode = ref;
    // console.log("setTargetRef",ref,this.targetNode)
  };

  handleMouseEvent = (e: any) => {
    e.stopPropagation();
  };

  handleScroll = (e: any) => {
    if (this.state.isHovered === false) {
      return;
    }

    if (e?.srcElement?.className?.indexOf('contract-trigger') >= 0) {
      return;
    }
    if (e?.srcElement?.className?.indexOf('texty-scroll') >= 0) {
      return;
    }
    // 只响应父级元素的滚动事件
    if (this.targetNode && this.targetNode.parentNode) {
      let parent = this.targetNode.parentNode;
      let isParent = false;
      while (parent !== null) {
        if (parent === e.target) {
          isParent = true;
          break;
        }
        parent = parent.parentNode;
      }
      if (isParent === false) {
        return;
      }
    }
    this.setState({ isHovered: false });
  };

  _clearListenTimer() {
    if (this.listenTimer) {
      clearTimeout(this.listenTimer);
      this.listenTimer = null;
    }
  }

  _clearShowTimer() {
    if (this.showTimer) {
      clearTimeout(this.showTimer);
      this.showTimer = null;
    }
  }

  _clearHideTimer() {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
  }

  handleMouseEnter = (e: any) => {
    const target = this.targetNode;

    // const isTruncated = (!!target && target.scrollWidth > target.offsetWidth) || this.props.auto === false;
    const isTruncated =
      (!!target && checkEllipsis(target)) || this.props.auto === false;
    if (!isTruncated) {
      return;
    }

    // eslint-disable-next-line react/prop-types
    const { showDelay, onMouseEnter } = this.props;
    onMouseEnter && onMouseEnter(e);

    this._clearHideTimer();

    if (!showDelay) {
      this.setState({ isHovered: true });
      return;
    }

    this.showTimer = setTimeout(() => {
      this.setState({ isHovered: true });
      this.showTimer = null;
    }, showDelay);
  };

  handleMouseLeave = (e: any) => {
    // console.log('handleMouseLeave');
    // eslint-disable-next-line react/prop-types
    const { hideDelay, onMouseLeave } = this.props;
    onMouseLeave && onMouseLeave(e);

    this._clearShowTimer();

    const { isHovered } = this.state;
    if (!isHovered) return;

    if (!hideDelay) {
      this.setState({ isHovered: false });
      return;
    }

    this.hideTimer = setTimeout(() => {
      this.setState({ isHovered: false });
      this.hideTimer = null;
    }, hideDelay);
  };

  static defaultProps = {
    tagName: 'div',
    showDelay: 150,
    hideDelay: 150,
    hideArrow: true,
    placement: 'top',
  };
}

export default Texty;
