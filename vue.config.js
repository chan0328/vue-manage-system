module.exports = {
    baseUrl: process.env.NODE_ENV === 'production' ? '/online/' : '/',
// outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'
    outputDir: 'dist',
    productionSourceMap: false,
    devServer: {
        port: 8080,
        proxy: {
            '/api':{
                target:'http://jsonplaceholder.typicode.com',
                changeOrigin:true,
                pathRewrite:{
                    '/api':''
                }
            },
            '/ms':{
                target: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
                changeOrigin: true
            }
        }
    }
}