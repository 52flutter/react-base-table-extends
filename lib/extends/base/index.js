"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseTable = void 0;

var _base = _interopRequireDefault(require("../../base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseTable = _base.default; // /// 这里是为了继承原始类  修改里面一些自己的东西 主要为了把fixed情况下 flex的值用width 做多表头对齐的作用
// class ColumnManagerEx extends ColumnManager {
//   recomputeColumnStyle(column: ArtColumn) {
//     let flexGrow = 0;
//     let flexShrink = 0;
//     //@ts-ignore
//     if (!this._fixed) {
//       flexGrow =
//         typeof column.flexGrow === 'number'
//           ? column.flexGrow
//           : column.width
//           ? column.width
//           : 0;
//       flexShrink =
//         typeof column.flexShrink === 'number' ? column.flexShrink : 1;
//     }
//     // workaround for Flex bug on IE: https://github.com/philipwalton/flexbugs#flexbug-7
//     const flexValue = `${flexGrow} ${flexShrink} auto`;
//     const style = {
//       ...column.style,
//       flex: flexValue,
//       msFlex: flexValue,
//       WebkitFlex: flexValue,
//       width: column.width,
//       overflow: 'hidden',
//     };
//     //@ts-ignore
//     if (!this._fixed && column.maxWidth) {
//       style.maxWidth = column.maxWidth;
//     }
//     //@ts-ignore
//     if (!this._fixed && column.minWidth) {
//       style.minWidth = column.minWidth;
//     }
//     return style;
//   }
// }
// const getColumns = memoize(
//   (columns, children) => columns || normalizeColumns(children),
// );
// export class BaseTable<T = any> extends Table<T> {
//   constructor(props: any) {
//     super(props);
//     const { columns, children } = props;
//     const _columns = getColumns(columns, children);
//     // @ts-ignore
//     this.columnManager = new ColumnManagerEx(_columns, props.fixed);
//   }
// }

exports.BaseTable = BaseTable;