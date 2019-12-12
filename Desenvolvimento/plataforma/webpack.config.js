module.exports = {
  watchOptions: {
    poll: true,
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|svg|pdf|jpe?g|gif)$/,
        use: [
          {
            loader: "url-loader"
            // options: {
            //   name: '[path][name]-[hash:8].[ext]'
            // }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
