const path = require('path');

module.exports = {
    contentBase: 'src/www',
    devtool: 'eval',
    hot: true,
    inline: true,
    host: '0.0.0.0',
    port: 3009,
    proxy: {
        '/service/*': {
            target: 'http://localhost:3008/',
            pathRewrite: {
                '^/service': '/'
            },
            secure: false,
            changeOrigin: true
        }
    },
    outputPath: path.resolve(__dirname, './build'),
};