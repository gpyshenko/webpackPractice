const fileLoader = function(env) {
    return {
        loader: 'file-loader',
        options: {
            name: (env === 'dev') ? '[name].[hash].[ext]' : '[name].[ext]',
            outputPath: 'assets/img/',
            plugins: [
                require('imagemin-mozjpeg')({
                    progressive: true,
                    arithmetic: false
                }),
                require('imagemin-pngquant')({
                    floyd: 0.5,
                    speed: 2
                }),
                require('imagemin-svgo')({
                    plugins: [
                        { removeTitle: true },
                        { convertPathData: false }
                    ]
                })
            ]
        }
    }
}

const imgLoader = {
    loader: 'img-loader'
}

module.exports = function (env) {
    let use = (env === 'dev') ? [fileLoader(env),imgLoader] : [fileLoader]
    return {
        module: {
            rules: [
                {
                    test: /\.(jpe?g|png|gif|svg)$/,
                    use: use
                },
            ],
        },
    };
};