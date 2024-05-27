const path = require('path');

module.exports = {
  entry: {
    index: './src/index.js',
    block: './src/components/PixelArtBlock.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js', // This will create block.js and block.js in the dist folder
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
