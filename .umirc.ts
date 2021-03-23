import { defineConfig } from 'dumi';

export default defineConfig({
  // base:
  //   process.env.NODE_ENV === 'production' ? '/react-base-table-extends/' : '/',
  publicPath:
    process.env.NODE_ENV === 'production' ? '/react-base-table-extends/' : '/',
  title: 'react-base-table-extends',
  history: { type: 'hash' },
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  // more config: https://d.umijs.org/config
});
