module.exports = {
  entry: {
    App: './src/js/app.js',
  },
  output: {
    path: 'public',
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
};
