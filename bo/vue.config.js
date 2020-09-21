const path = require('path')

module.exports = {
  devServer: {
    public: 'bo.club-airways.localhost'
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  }
}
