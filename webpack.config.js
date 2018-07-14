const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
    entry: {
        index: "./index.js"
    },
    devtool: "source-map",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                process.env.NODE_ENV === "production" || process.env.TRAVIS ? MiniCssExtractPlugin.loader : 'style-loader',
                'css-loader',
                {
                    loader: 'fast-sass-loader'
                }
            ]
        },
        {
            test: /\.(html|txt)$/,
            use: [{
                loader: "file-loader",
                options: {
                    context: path.resolve(__dirname, "./"),
                    outputPath: "",
                    name: "[name].[ext]",
                }
            }]
        },
        {
            test: /\.(png|jpg|gif|svg)$/,
            use: [
                {
                    loader: "file-loader",
                    options: {
                        context: path.resolve(__dirname, "./"),
                        outputPath: "/",
                        name: "[path][name].[ext]"
                    }
                }
            ]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
};
