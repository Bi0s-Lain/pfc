const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const PRODUCTION = false;
const DIST_FOLDER = path.resolve(__dirname, '../server/public');

module.exports = {
   entry: path.resolve(__dirname, 'src', 'scripts', 'main.js'),

   output: {
      path: path.resolve(__dirname, DIST_FOLDER),
      filename: 'scripts/bundle.js',
      clean: true
   },

   mode: (PRODUCTION ? 'production' : 'development'),
   devtool: (PRODUCTION ? undefined : 'eval-source-map'),


   module: {
      rules: [
         {
            test: /\.(m?js$|jsx)/,
            exclude: /(node_modules)/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: [
                     '@babel/preset-env',
                     '@babel/preset-react'
                  ]
               }
            },
           
         },
         {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
         },
         {
            test: /\.(png|jpg|gif)/i,
            use: {
               loader: 'file-loader',
               options: {
                  name: '[name].[ext]',
                  outputPath: 'images'
               }
            }
         }
      ]
   },

   plugins: [      
      new webpack.ProgressPlugin(),
      new FaviconsWebpackPlugin('src/favicon.ico'), 
      new HtmlWebpackPlugin({
         template: path.resolve(__dirname, 'src', 'index.html'),
         filename: './index.html',
         hash: true,
      }),

      new HtmlWebpackPlugin({
         template: path.resolve(__dirname, 'src', 'about.html'),
         filename: 'about.html',
         hash: true,
      }),

      new HtmlWebpackPlugin({
         template: path.resolve(__dirname, 'src', 'game.html'),
         filename: 'game.html',
         hash: true,
      }),

      new CopyPlugin({
         patterns: [
            {
               context: path.resolve(__dirname, 'src', 'html'),
               from: "**/*.html",
               to: 'html',
               noErrorOnMissing: true,
               globOptions: {}
            },
            {
               context: path.resolve(__dirname, 'src', 'images'),
               from: '**/*',
               to: 'images/[name][ext]',
               noErrorOnMissing: true,
            },
            {
               context: path.resolve(__dirname, 'src', 'style'),
               from: '**/*.css',
               to: 'style/[name][ext]',
               noErrorOnMissing: true,
            }
         ]
      }),
   ],


   // gestion de bibliothèques externes à exclure du bundle, ici cas de React
   externals: {
      react: 'React',
      'react-dom/client': 'ReactDOM'
   }
}
