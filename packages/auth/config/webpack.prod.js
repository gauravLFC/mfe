const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJSON = require('../package.json');
const commonConfig = require('./webpack.common');

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/auth/latest/'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'auth',
            exposes: {
                './AuthApp': './src/bootstrap'
            },
            filename: 'remoteEntry.js',
            shared: packageJSON.dependencies
        })
    ]
}

module.exports = merge(commonConfig, prodConfig);