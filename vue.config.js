const fs = require( 'fs' );
const webpack = require( 'webpack' );

const packageJson = fs.readFileSync( './package.json' );
const version = JSON.parse( packageJson ).version || 0;

module.exports = {
    productionSourceMap: false,

    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    PACKAGE_VERSION: '"' + version + '"',
                },
            }),
        ],
    },    

    publicPath: process.env.NODE_ENV === 'production'
        ? '/sensors/'
        : '/',

    pwa: {
        assetsVersion: version,
        themeColor: '#6E72C9',
        msTileColor: '#C9836E',
        appleMobileWebAppCache: 'yes',
        manifestOptions: {
            name: 'Sensors',
            background_color: '#FFFFFF',
        },
        iconPaths: {
            favicon32: 'img/icons/favicon-32x32.png',
            favicon16: 'img/icons/favicon-16x16.png',
            appleTouchIcon: 'img/icons/apple-touch-icon.png',
            maskIcon: 'img/icons/safari-pinned-tab.svg',
            msTileImage: 'img/icons/mstile-150x150.png',
        },
    },
}