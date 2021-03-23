import { FixedSizeGrid, VariableSizeGrid } from 'react-window';

const findNearestItem = (itemType, props, instanceProps, offset) => {
  let itemMetadataMap, lastMeasuredIndex;
  if (itemType === 'column') {
    itemMetadataMap = instanceProps.columnMetadataMap;
    lastMeasuredIndex = instanceProps.lastMeasuredColumnIndex;
  } else {
    itemMetadataMap = instanceProps.rowMetadataMap;
    lastMeasuredIndex = instanceProps.lastMeasuredRowIndex;
  }

  const lastMeasuredItemOffset =
    lastMeasuredIndex > 0 ? itemMetadataMap[lastMeasuredIndex].offset : 0;

  if (lastMeasuredItemOffset >= offset) {
    // If we've already measured items within this range just use a binary search as it's faster.
    return findNearestItemBinarySearch(
      itemType,
      props,
      instanceProps,
      lastMeasuredIndex,
      0,
      offset,
    );
  } else {
    // If we haven't yet measured this high, fallback to an exponential search with an inner binary search.
    // The exponential search avoids pre-computing sizes for the full set of items as a binary search would.
    // The overall complexity for this approach is O(log n).
    return findNearestItemExponentialSearch(
      itemType,
      props,
      instanceProps,
      Math.max(0, lastMeasuredIndex),
      offset,
    );
  }
};

const findNearestItemBinarySearch = (
  itemType,
  props,
  instanceProps,
  high,
  low,
  offset,
) => {
  while (low <= high) {
    const middle = low + Math.floor((high - low) / 2);
    const currentOffset = getItemMetadata(
      itemType,
      props,
      middle,
      instanceProps,
    ).offset;

    if (currentOffset === offset) {
      return middle;
    } else if (currentOffset < offset) {
      low = middle + 1;
    } else if (currentOffset > offset) {
      high = middle - 1;
    }
  }

  if (low > 0) {
    return low - 1;
  } else {
    return 0;
  }
};

const findNearestItemExponentialSearch = (
  itemType,
  props,
  instanceProps,
  index,
  offset,
) => {
  const itemCount = itemType === 'column' ? props.columnCount : props.rowCount;
  let interval = 1;

  while (
    index < itemCount &&
    getItemMetadata(itemType, props, index, instanceProps).offset < offset
  ) {
    index += interval;
    interval *= 2;
  }

  return findNearestItemBinarySearch(
    itemType,
    props,
    instanceProps,
    Math.min(index, itemCount - 1),
    Math.floor(index / 2),
    offset,
  );
};

const getItemMetadata = (itemType, props, index, instanceProps) => {
  let itemMetadataMap, itemSize, lastMeasuredIndex;
  if (itemType === 'column') {
    itemMetadataMap = instanceProps.columnMetadataMap;
    itemSize = props.columnWidth;
    lastMeasuredIndex = instanceProps.lastMeasuredColumnIndex;
  } else {
    itemMetadataMap = instanceProps.rowMetadataMap;
    itemSize = props.rowHeight;
    lastMeasuredIndex = instanceProps.lastMeasuredRowIndex;
  }

  if (index > lastMeasuredIndex) {
    let offset = 0;
    if (lastMeasuredIndex >= 0) {
      const itemMetadata = itemMetadataMap[lastMeasuredIndex];
      offset = itemMetadata.offset + itemMetadata.size;
    }

    for (let i = lastMeasuredIndex + 1; i <= index; i++) {
      let size = itemSize(i);

      itemMetadataMap[i] = {
        offset,
        size,
      };

      offset += size;
    }

    if (itemType === 'column') {
      instanceProps.lastMeasuredColumnIndex = index;
    } else {
      instanceProps.lastMeasuredRowIndex = index;
    }
  }

  return itemMetadataMap[index];
};

const getRowStopIndexForStartIndex = (
  props,
  startIndex,
  scrollTop,
  instanceProps,
) => {
  const { rowCount, height } = props;

  const itemMetadata = getItemMetadata('row', props, startIndex, instanceProps);
  const maxOffset = scrollTop + height;

  let offset = itemMetadata.offset + itemMetadata.size;
  let stopIndex = startIndex;

  while (stopIndex < rowCount - 1 && offset < maxOffset) {
    stopIndex++;
    offset += getItemMetadata('row', props, stopIndex, instanceProps).size;
  }

  return stopIndex;
};

const getRowStartIndexForOffset = (props, scrollTop, instanceProps) =>
  findNearestItem('row', props, instanceProps, scrollTop);

export default class Index extends VariableSizeGrid {
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
