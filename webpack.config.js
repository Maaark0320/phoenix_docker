var pwd = __dirname;
var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: [
    path.join(pwd, "web", "static", "css", "app.css"),
    path.join(pwd, "web", "static", "js", "app.js")
  ],

  output: {
    path: path.join(pwd, "priv", "static", "js"),
    filename: "app.js"
  },

  resolve: {
    alias: {
      vue: "vue/dist/vue.js",
      static: path.join(pwd, "web", "static"),
      deps: path.join(pwd, "deps")
    }
  },

  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: "vue"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ["es2015"]
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style", "css")
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url",
        query: {
          limit: 10000
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url",
        query: {
          limit: 10000,
          name: "fonts/[name].[ext]?[hash]"
        }
      }
    ]
  },

  vue: {
    loaders: {
      scss: "vue-style!css!sass",
      stylus: "vue-style!css!stylus"
    }
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("css/app.css"),
    new CopyWebpackPlugin([
      { from: path.join(pwd, "web", "static", "assets") }
    ])
  ],

  watch: true,

  watchOptions: {
    poll: true
  },

  devtool: "#inline-source-map"
};
