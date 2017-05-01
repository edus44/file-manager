module.exports = {
    host:'0.0.0.0',
    html:{
        template:'./src/index.html'
    },
    entry: './src/main.js',
    proxy:{
        '/api': {
            target: 'http://127.0.0.1:8010',
            changeOrigin:true,
            pathRewrite: {'^/api' : '/'}
        }
    }
}