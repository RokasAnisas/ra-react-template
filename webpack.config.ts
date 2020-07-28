import * as path from 'path';
import * as webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';

const IOconfig = {
  entry: path.resolve(__dirname, './src/index.tsx'),
  output: {
    dir: path.resolve(__dirname, 'dist'),
    js: 'app.bundle.[hash].js',
    css: 'styles.min.[hash].css',
  },
  htmlTemplate: path.resolve(__dirname, 'src/index.html'),
  themeRes: path.resolve(__dirname, 'src/theme/res/_index.scss'),
};

const config: webpack.Configuration = {
  entry: IOconfig.entry,
  stats: 'minimal',
  devtool: 'source-map',
  output: {
    path: IOconfig.output.dir,
    filename: IOconfig.output.js,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.ts', '.tsx', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: [/node_modules/],
        use: ['ts-loader', 'eslint-loader'],
      },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: IOconfig.themeRes,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: IOconfig.htmlTemplate,
    }),
    new MiniCssExtractPlugin({
      filename: IOconfig.output.css,
    }),
    new StylelintPlugin(),
    new CleanWebpackPlugin(),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['dist'] },
      notify: false,
    }),
  ],
};

export default config;
