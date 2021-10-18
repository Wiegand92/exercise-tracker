const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

// In dev mode if env.NODE_ENV is developer //
const devMode = process.env.NODE_ENV === 'development';

const plugins = [];

// Enable MiniCss in production only //
if (!devMode) {
  plugins.push(
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  );
}

module.exports = {
  mode: devMode ? 'development' : 'production',

  entry: './src/index.js',

  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'public/scripts'),
    clean: true,
  },

  plugins,

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.js', '.jsx'],
        },
        use: [
          {
            loader: 'source-map-loader',
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['@babel/plugin-proposal-class-properties'],
            },
          },
        ],
      },
      {
        test: /\.s?css$/,
        use: [
          //If we're in dev-mode, use inline-styles, else extract to separate css file
          devMode
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '/scripts/',
                },
              },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },

  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 8080,
    proxy: {'/': 'http://localhost:4200'},
  },

  devtool: 'cheap-module-source-map',
};
