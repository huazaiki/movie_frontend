const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  
})
module.exports = {
  chainWebpack: config => {
      config.module.rules.delete('eslint');
  },
  devServer:{
    // port:8080,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8085',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '/api': ''
    //     }
    //   }
    // },
    // headers: {
    //   'Cache-Control': 'no-store'
    // }
    proxy: {
      '/api': {
        target: 'http://localhost:8085', // 代理到 8085 端口
        changeOrigin: true,
        pathRewrite: {}, // 可选：根据需要重写路径
      },
    },
    headers: {
      'Cache-Control': 'no-store'
    }
  }
}
