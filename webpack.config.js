const path = require("path");

module.exports = {
  entry: {
    'FontMetrics': './source/FontMetrics.js',
    'demo': './source/demo/index.js',
  },
  output: {
    library: {
      // name: "FontMetrics",
      type: "module"
    },
    publicPath: '/output/',
    path: path.resolve(__dirname, './output')
  },
  plugins: [],
  /*module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /(node_modules)/
      }
    ]
  },*/
  experiments: {
    outputModule: true
  }
}