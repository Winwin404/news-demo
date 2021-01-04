// const path = require("path");
// function resolve(dir){
//   return path.join(__dirname,dir)
// }

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/news-demo/'
    : '/'
  // configureWebpack:{
  //   resolve:{
  //     //为文件夹起别名
  //     alias:{
  //       'assets':resolve('src/assets'),
  //       'common':resolve('src/components/common'),
  //       'content':resolve('src/components/content'),
  //       'views':resolve('src/views'),
  //       'network':resolve('src/network'),
  //       'store':resolve('src/store')
  //     }
  //   }
  // },

  // 配置本地CROS跨域请求代理，vue配置proxy
  // proxy:{'/api':{}},代理器中设置/api,项目中请求路径为/api的替换为target
  // devServer:{
    // proxy:{
    //   '/proapi':{
    //     target:'http://api-toutiao-web.itheima.net/', //代理地址，这里设置的地址会代替axios中设置的baseURL
    //     ws: true, // proxy websockets,是否使用https
    //     changeOrigin: true,  //是否跨域
    //     pathRewrite:{
    //       '^/proapi':'/proapi'
    //     }
    //   }
    //   // '/APIblog':{
    //   //   target:'http://52.83.10.19/blog', //代理地址，这里设置的地址会代替axios中设置的baseURL
    //   //   ws: true, // proxy websockets,是否使用https
    //   //   changeOrigin: true,  //是否跨域
    //   //   pathRewrite:{
    //   //     '^/APIblog':''
    //   //   }
    //   // }
    // }
  // }
}