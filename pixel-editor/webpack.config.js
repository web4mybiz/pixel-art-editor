const path = require('path');

module.exports = {
    mode: 'development', // or 'production'
    entry: {
        index: './src/index.js',
        block: './src/components/PixelArtBlock.js',
    },
    output: {
        path: path.resolve(__dirname, '../js'),
        filename: '[name].js', // This will create block.js and block.js in the dist folder
    },
    module: {
        rules: [
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
            },
            },
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    externals: {
        //react: 'React',
        //'react-dom': 'ReactDOM',
        '@wordpress/blocks': ['wp', 'blocks'],
        '@wordpress/block-editor': ['wp', 'blockEditor'],
        '@wordpress/components': ['wp', 'components'],
        '@wordpress/element': ['wp', 'element'],
        '@wordpress/i18n': ['wp', 'i18n'],
    },
};
