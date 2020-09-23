const TerserPlugin = require('terser-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    configureWebpack: {
        mode: "development",
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
