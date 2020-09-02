var nodeExternals = require("webpack-node-externals");
var webpack = require("webpack");
var path = require("path");

module.exports = {
  entry: "./src/index.ts",
  target: "node",
  mode: "production",
  optimization: {
    minimize: true,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    libraryTarget: "commonjs2",
  },
  resolve: {
    extensions: [".ts"],
    modules: ["node_modules", "src"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: [/node_modules/],
      },
    ],
  },
  externals: [nodeExternals()],
};
