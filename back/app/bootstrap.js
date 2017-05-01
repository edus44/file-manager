'use strict'

const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const expressDeliver = require('express-deliver-2')

require('./exceptions')

module.exports = app => {

    expressDeliver(app)

    app.use(morgan('dev'))
    app.use(cors())
    app.use(bodyParser.json())

    require('./routes')(app)

    expressDeliver.errorHandler(app)
}