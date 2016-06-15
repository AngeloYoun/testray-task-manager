var jsDirectory = `${__dirname}/docroot/js`;

module.exports = {
	context: `${jsDirectory}/src`,
	entry: `${jsDirectory}/src/main.js`,
	module: {
		loaders: [
			{
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'metal-jsx', 'stage-2']
				},
				test: /\.js$/
			}
		]
	},
	output: {
		filename: 'bundle.nocsf.js',
		library: 'RC',
		libraryTarget: 'var',
		path: `${jsDirectory}/dist`
	}
};