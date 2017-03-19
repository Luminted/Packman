var path = require("path");
module.exports = function (grunt) {
	// load npm tasks for grunt-* libs, excluding grunt-cli
	require('matchdep').filterDev('grunt-*').filter(function (pkg) {
		return ['grunt-cli'].indexOf(pkg) < 0;
	}).forEach(grunt.loadNpmTasks);
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
				inline: false,
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
		},
		copy: {
			main: {
				files: [
					// includes files within path
					{
						expand: true,
						cwd: 'src/',
						src: ['**/*.html', '**/*.css'],
						dest: 'build/',
						filter: 'isFile'
					},
				],
			},
		},
		clean: ['build/*.html', 'build/*.css']
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// The development server (the recommended option for development)
	grunt.registerTask("default", ["webpack-dev-server:start"]);

	// Build and watch cycle (another option for development)
	// Advantage: No server required, can run app from filesystem
	// Disadvantage: Requests are not blocked until bundle is available,
	//               can serve an old app on too fast refresh
	grunt.registerTask("server", ["webpack-dev-server:start"]);

	// Production build
	grunt.registerTask("build", ["clean","webpack","copy"]);

};