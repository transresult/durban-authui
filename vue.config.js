const TerserPlugin = require('terser-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
console.log("isProd:", isProd)

module.exports = {
    configureWebpack: {
        mode: process.env.NODE_ENV,
        optimization: {
            minimize: true,
            minimizer: isProd ? [
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            drop_console: true,
                        },
                        output: {
                            comments: false,
                        },
                    },
                }),
            ] : [],
        },
    },
    "transpileDependencies": ["vuetify"]
}
