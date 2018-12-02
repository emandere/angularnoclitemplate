const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ScriptExtPlugin = require('script-ext-html-webpack-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const path = require('path');
const webpack = require("webpack");


module.exports = function () {
    return {
        entry: {
            polyfills: "./src/polyfills.ts",
            main: "./src/app.ts"
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: "[name].js"
        },
        resolve: {
            extensions: ['.ts', '.js']
        },

        mode:"development",

        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: "awesome-typescript-loader"
                },
                {
                    test: /\.ts$/,
                    enforce: "pre",
                    loader: 'tslint-loader'
                },
                { test: /\.html$/, loader: 'html-loader' },
                { test: /\.css$/, loader: 'raw-loader' }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "src/index.html",
                inject: "body"
            }),
    
            new webpack.ContextReplacementPlugin(
                /\@angular(\\|\/)core(\\|\/)fesm5/,
                path.resolve(__dirname, 'src'),{}
            ),
            new FilterWarningsPlugin({
                exclude: /System.import/
            })
        ],
        devtool: "source-map",
        devServer: {
              historyApiFallback: true
        }
    };
}