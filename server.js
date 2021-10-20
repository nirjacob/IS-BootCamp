const app = require('./app')
const config = require('config')
app.listen(config.port || process.env.port, () => console.log('App is Up'))
