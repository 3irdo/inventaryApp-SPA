const HTMLwebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require("autoprefixer");

module.exports = {
  entry: "./src/js/main.js",
  mode: "development",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i, //todos los archivos que terminen en css o sass se cargarán con style loader o sass loader
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },

          {
            // Loader for webpack to process CSS with PostCSS
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [autoprefixer],
              },
            },
          },

          {
            loader: "sass-loader",
          },
        ],
      },

      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },

  plugins: [
    new HTMLwebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
