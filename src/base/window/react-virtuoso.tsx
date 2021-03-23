// // import { useEffect } from '@umijs/renderer-react/node_modules/@types/react';
// import React, {
//   ReactNode,
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
// } from 'react';
// import { Virtuoso } from 'react-virtuoso';

// interface IProps {
//   scrollerRef?: (ref: HTMLElement | Window | null) => any;
//   style?: React.CSSProperties;
//   data: any[];
//   frozenData: any[];
//   width?: number;
//   rowHeight?: number;
//   estimatedRowHeight?: number | ((rowIndex: number) => number);
//   rowCount?: number;
//   overscanRowCount?: number;

//   useIsScrolling?: boolean;

//   onScroll?: ({
//     scrollTop,
//     scrollLeft,
//   }: {
//     scrollTop: number;
//     scrollLeft: number;
//   }) => void;
//   itemContent: (index: number, data: any) => ReactNode;
// }

// export default React.forwardRef((props: IProps, ref: any) => {
//   const scrollRef = useRef<HTMLElement>();
//   const {
//     style,
//     scrollerRef,
//     data = [],
//     itemContent,
//     rowHeight,
//     onScroll,
//     width,
//     overscanRowCount,
//   } = props;

//   const setScrollRef = useCallback(
//     el => {
//       scrollRef.current = el;
//       scrollerRef && scrollerRef(el);
//     },
//     [scrollerRef],
//   );

//   const onSelfScroll = useCallback(
//     (e: any) => {
//       const { scrollTop, scrollLeft } = e?.target || ({} as HTMLElement);
//       onScroll && onScroll({ scrollTop, scrollLeft });
//     },
//     [onScroll],
//   );

//   const setScrollState = useCallback((scrolling: boolean) => {
//     setIsScrolling(scrolling);
//   }, []);

//   const [isScrolling, setIsScrolling] = useState(false);

//   useEffect(() => {
//     if (scrollRef.current) {
//       const childNodes = scrollRef.current.childNodes;
//       if (childNodes?.length) {
//         (childNodes[0] as any).style.width = `${width}px`;
//       }
//     }
//   }, [width]);

//   useEffect(() => {
//     if (scrollRef.current) {
//       const childNodes = scrollRef.current.childNodes;
//       if (childNodes?.length) {
//         (childNodes[0] as any).style['pointerEvents'] = isScrolling
//           ? 'none'
//           : 'auto';
//       }
//     }
//   }, [isScrolling]);

//   return (
//     <Virtuoso
//       overscan={
//         overscanRowCount
//           ? { main: overscanRowCount, reverse: overscanRowCount }
//           : undefined
//       }
//       ref={ref}
//       isScrolling={setScrollState}
//       itemContent={itemContent}
//       style={style}
//       data={data}
//       totalCount={data.length}
//       scrollerRef={setScrollRef}
//       fixedItemHeight={rowHeight}
//       onScroll={onSelfScroll}
//       // scrollSeekConfiguration={true}
//     />
//   );
// });
