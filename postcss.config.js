module.exports = {
  plugins: [
      require('autoprefixer'),
      require('precss'),
      require('css-mqpacker'),
      require('sort-css-media-queries'),
      require('postcss-line-height-px-to-unitless')
  ]
}