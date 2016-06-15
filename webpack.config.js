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
			},
			{
				test      : /\.scss$/,
				include   : `${__dirname}/docroot/css`,
				loaders   : ["style", "css", "sass"]
			}
		],
		sassLoader: {
			includePaths: `${__dirname}/docroot/css`
		}
	},
	output: {
		filename: 'bundle.nocsf.js',
		library: 'RC',
		libraryTarget: 'var',
		path: `${jsDirectory}/dist`
	}
};