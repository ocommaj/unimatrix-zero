const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  /*devServer: {
    host: '0.0.0.0'
  },*/
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(glb|bin)$/,
        loader: 'file-loader',
        options: { esModule: true },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        type: 'asset/resource'
      },
      {
        test: /\.ttf$/,
        use: 'url-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  optimization: {
    minimize: true,
    minimizer: [
      '...',
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      favicon: './src/assets/icons/favicon/fav.ico',
      meta: {
        "og:image": "https://github.com/ocommaj/unimatrix-zero/blob/main/src/assets/img/ocommaj_preview_hi.jpg?raw=true"
      }
    }),
  ],
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
};
