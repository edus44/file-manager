'use strict'

const express = require('express')
const debug = require('debug')('app:root')
const app = express()
const port = process.env.PORT || 8010

require('./app/bootstrap')(app)

app.listen(port,()=>{
    debug('listening',port)
})
