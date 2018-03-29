var webpack = require('webpack'),
    path = require('path'),
    autoprefixer = require('autoprefixer'),
    precss = require('precss'),
    node_modules_dir = path.join(__dirname, 'node_modules');

//alias
const Alias = require('./alias');


var entry = {   
    index: ['webpack/hot/only-dev-server', './src/index.js'],
    doctor: ['webpack/hot/only-dev-server', './src/doctor.js'],
    video: ['webpack/hot/only-dev-server', './src/video.js'],
    tip: ['webpack/hot/only-dev-server', './src/tip.js'],
    audio: ['webpack/hot/only-dev-server','./src/audio.js'],
    test: ['webpack/hot/only-dev-server','./src/test.js']
};

var output = {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js'
};

var config = {
    entry: entry,
    output: output,
    module: {
        noParse: [],
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
            loader: 'babel-loader'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader!postcss-loader'
        }, {
            test: /\.scss$/,
            loader: 'style-loader!css-loader!sass-loader'
        }, {
            test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader'
        }, {
            test: /\.(gif|jpg|jpeg|png|woff|svg|eot|ttf)\??.*$/,
            loader: 'url-loader?limit=10000&name=./images/[name].[ext]'
        }]
    },
    resolve: {
        root: [process.cwd() + '/src'],
        alias: {},
        extensions: ['', '.js', '.html', '.css', '.scss']
    },
    devServer: require('./devServer'),
    postcss: function () {
        return [autoprefixer, precss];
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}


Alias(config);

module.exports = config;