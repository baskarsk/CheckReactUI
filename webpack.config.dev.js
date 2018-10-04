import webpack from 'webpack';
import path from 'path';

const utilPath = path.join(__dirname, 'src/util/');

export default {
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  noInfo: false,
  entry: {
		bodha: ["babel-polyfill","webpack-hot-middleware/client?reload=true","./src/main"],
	},
  resolve: { alias: {


  } },
  target: 'web',
	output: {
    path: path.join(__dirname, "dist"), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: "[name].js"
  },
  devServer: {
    contentBase: './'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    }),
   new webpack.IgnorePlugin(/ReactContext|react\/addons/),
   new webpack.DefinePlugin({
     'process.env.FPC_ENV': JSON.stringify('development')
   })
  ],
  module: {
    noParse: [],
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
      {test: /\.css$/, loader: "style-loader!css-loader"},
      {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.png$/, loader: 'url?limit=10000'},
      {test: /\.gif$/, loader: 'url?limit=10000'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000'}
    ]
  }
};
