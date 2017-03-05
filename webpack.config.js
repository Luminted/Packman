module.exports = {
    entry: "./src/js/game/main.js",
    output: {
        path: "/src/js/game/",
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