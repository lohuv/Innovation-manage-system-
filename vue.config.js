module.exports = {
    publicPath: '/admin',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        port:10001,
        proxy: {
            '/api':{
                target:'http://112.126.70.15:8081',
                changeOrigin:true,
                pathRewrite:{
                    '^/api':'/'
                }
            }
        }
    }
};