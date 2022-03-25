var path = require('path');

module.exports = {
    mode: "production",
    entry: './server.js',
    output: {
        filename: 'bundleCNAB240BE.js',
        path: path.resolve(__dirname + '/dist')

    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'es2015']
                    }
                }
            }
        ]
           
    },    
    node: { fs: 'empty', 
         net: 'empty' }  
};