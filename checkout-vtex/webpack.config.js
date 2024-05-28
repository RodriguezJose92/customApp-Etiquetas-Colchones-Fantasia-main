const path = require('path')

module.exports = {
  entry: ['./src/index.js', './src/index.scss'],
  output: {
    path: path.resolve(__dirname, './checkout-ui-custom'),
    filename: 'checkout6-custom.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'checkout6-custom.css',
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
}
