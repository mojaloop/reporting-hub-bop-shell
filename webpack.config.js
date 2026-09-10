const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const DotenvPlugin = require('dotenv-webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

require('dotenv').config({
  path: './.env',
});

const { DEV_PORT } = process.env;

const config = {
  DEV_PORT,
};

module.exports = (env, argv) => ({
  entry: './src/index',
  devtool: argv.mode === 'production' ? 'source-map' : 'eval-cheap-module-source-map',
  devServer: {
    allowedHosts: 'all',
    // Enable gzip compression of generated files.
    compress: true,
    // Silence the dev server's own logs since they're generally not useful.
    // It will still show compile warnings and errors with this setting.
    client: {
      logging: 'none',
    },
    // Enable hot reloading server. Note that only changes to CSS are currently
    // hot reloaded. JS changes will refresh the browser.
    hot: true,
    historyApiFallback: true, // React Router
    // Serve, and reload on, anything already built into dist.
    static: {
      directory: path.join(__dirname, 'dist'),
      publicPath: '/',
      watch: true,
    },
    port: config.DEV_PORT,
    host: '0.0.0.0',
    // When microfrontends are consumed, requests originate from the shell.
    // So for local testing we need to duplicate proxies for the services
    // the microfrontends depend on. You can typically just copy/paste
    // the proxies found in the remote microfrontend's `webpack.config.js`.
    // This is only for local development.
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost',
        secure: false,
      },
      // For local testing update `target` to point to your
      // locally hosted or port-forwarded `role-assignment-service` service
      {
        context: ['/role-assignment'],
        target: 'http://localhost:port',
        pathRewrite: { '^/role-assignment': '' },
        secure: false,
      },
      {
        // For local testing update `target` to point to your
        // locally hosted or port-forwarded `central-settlements` service
        context: ['/central-settlements'],
        target: 'http://localhost:port',
        pathRewrite: { '^/central-settlements': '/v2' },
        secure: false,
      },
      {
        // For local testing update `target` to point to your
        // locally hosted or port-forwarded `central-ledger` service
        context: ['/central-ledger'],
        target: 'http://localhost:port',
        pathRewrite: { '^/central-ledger': '' },
        secure: false,
      },
      {
        // For local testing update `target` to point to your
        // locally hosted or port-forwarded `reporting-hub-bop-api-svc` service
        context: ['/reporting-api'],
        target: 'http://localhost:port',
        pathRewrite: { '^/reporting-api': '' },
        secure: false,
      },
      {
        // For local testing update `target` to point to your
        // locally hosted or port-forwarded `@ory/oathkeeper` or `@ory/kratos` service
        context: ['/kratos'],
        target: 'http://localhost:4433',
        pathRewrite: { '^/kratos': '' },
        secure: false,
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // Do not use `auto` for publicPath.
    // After testing, `auto` breaks nested routes.
    publicPath: '/',
    // Hash files for cache busting
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                require.resolve('@babel/plugin-proposal-class-properties'),
                require.resolve('@babel/plugin-proposal-object-rest-spread'),
                require.resolve('babel-plugin-syntax-async-functions'),
                require.resolve('@babel/plugin-transform-runtime'),
              ].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
      {
        test: /\.(s)?css$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // SCSS
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {
            plugins: [{ removeViewBox: false }],
          },
        },
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'public/runtime-env.js', to: 'runtime-env.js' }],
    }),
    new EslintWebpackPlugin({
      extensions: ['ts', 'js', 'tsx', 'jsx'],
      exclude: ['node_modules'],
    }),
    new DotenvPlugin({
      systemvars: true,
    }),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}',
      },
    }),
    new ModuleFederationPlugin({
      shared: [
        'react',
        'react-dom',
        'react-redux',
        'react-router-dom',
        'redux',
        'redux-saga',
        'history',
        '@reduxjs/toolkit',
        '@modusbox/react-components',
      ],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
});
