var path = require("path");
module.exports = function(grunt) {
	require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);
	var webpack = require("webpack");
	var webpackConfig = require("./webpack.config.js");
	grunt.initConfig({
		webpack: {
			options: webpackConfig,
			build: {
				plugins: webpackConfig.plugins.concat(
					new webpack.DefinePlugin({
						"process.env": {
							// This has effect on the react lib size
							"NODE_ENV": JSON.stringify("production")
						}
					}),
					new webpack.optimize.DedupePlugin(),
					new webpack.optimize.UglifyJsPlugin()
				)
			},
			"build-dev": {
				devtool: "sourcemap"
			}
		},
		"webpack-dev-server": {
			options: {
				webpack: webpackConfig,
				contentBase: path.join(__dirname, "src"),
				publicPath: "/" + webpackConfig.output.publicPath,
				inline: true,
				port: 8080
			},
			start: {
				webpack: {
					devtool: "eval"
				}
			}
		},
		watch: {
			app: {
				files: ["src/**/*", "web_modules/**/*"],
				tasks: ["webpack:build-dev"],
				options: {
					spawn: false,
				}
			}
		}
	});

	// The development server (the recommended option for development)
	grunt.registerTask("default", ["webpack-dev-server:start"]);

	// Build and watch cycle (another option for development)
	// Advantage: No server required, can run app from filesystem
	// Disadvantage: Requests are not blocked until bundle is available,
	//               can serve an old app on too fast refresh
	grunt.registerTask("dev", ["webpack", "webpack-dev-server:start", "watch:app"]);

	// Production build
	grunt.registerTask("build", ["webpack:build"]);
};