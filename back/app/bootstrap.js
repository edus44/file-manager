'use strict'

const cors = require('cors')
const expressDeliver = require('express-deliver')
const debugError = require('debug')('app:error')

module.exports = app => {
    app.use(cors())
    app.use(expressDeliver)

    require('./routes')(app)

    expressDeliver.handlers(app)
    app.on('error',err=>{
        debugError('deliver-error',err)
    })
}