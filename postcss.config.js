module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px-to-viewport':{
      viewportWidth:1496,
      viewportHeight:635,
      unitPrecision:5,
      viewportUnit: 'rem',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaoQuery:false,
      propList:['*']
    }
  }
}
