module.exports = {
    test: /\.(jpg|png|jpeg|webp|svg)$/,
    loader: 'file-loader',
    options: {
      name: '[path][name].[ext]',
    },
}
