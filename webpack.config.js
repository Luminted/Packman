var path = require("path");
module.exports = {
    entry: "./src/js/game/main.js",
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/assets/",
        filename: "app.js"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    },
    plugins: []
};