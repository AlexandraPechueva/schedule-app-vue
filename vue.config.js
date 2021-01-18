module.exports = {
  css: {
    loaderOptions: {
     sass: {
      additionalData: `@import '@/assets/styles/scss/_variables.scss';`,
     }
    }
  },
  devServer: {
    proxy: 'http://localhost:8000'
  },
}
