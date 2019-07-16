module.exports = {
  plugins: {
    // to edit target browsers: use "browserslist" field in package.json
    'postcss-import': {},
    'postcss-aspect-ratio-mini': {},
    'postcss-write-svg': {
      utf8: false
    },
    'postcss-cssnext': {}, // cssnext内已集成 autoprefixer
    'postcss-px-to-viewport': {
      viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度
      // viewportHeight: 1334, // 视窗的高度
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['.ignore', '.hairlines', '.van'], // 指定不转换为视窗单位的类
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位
      mediaQuery: false, // 允许在媒体查询中转换`px`
    },
    'postcss-viewport-units': {},
    'cssnano': {
      preset: 'advanced',
      autoprefixer: false,
      'postcss-zindex': false
    },
    'postcss-safe-parser': {},
  }
}
