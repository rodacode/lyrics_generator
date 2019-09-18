module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
          ? '/lyrics_gen/'
          : '/',
    css: {
      sourceMap: true
    }
 }