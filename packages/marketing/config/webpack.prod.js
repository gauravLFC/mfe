const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJSON = require('../package.json');
const commonConfig = require('./webpack.common');

const prodConfig = {
    mode: 'development',
    output: {
        filename: '[name].[contenthash].js'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'marketing',
            exposes: {
                './MarketingApp': './src/bootstrap'
            },
            filename: 'remoteEntry.js',
            shared: packageJSON.dependencies
        })
    ]
}

module.exports = merge(commonConfig, prodConfig);