module.exports = {
  baseUrl: '/',
  devServer: {
    proxy: {
      '/api/*': {
        target: 'http://t.guanggaoxia.cn:8091',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api',
        }
      }
    }
  },

  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined
}