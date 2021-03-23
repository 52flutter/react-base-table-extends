export default {
  esm: 'babel',
  cjs: 'babel',
  extraBabelPlugins: [
    ['import', { libraryName: 'antd', style: false }],
    ['transform-remove-console', { exclude: ['warn', 'error'] }],
  ],
};
