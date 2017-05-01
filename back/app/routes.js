'use strict'

// const debug = require('debug')('app')

const fs = require('fs-extra')
const path = require('path')


module.exports = app => {

    app.post('/list',function*(req){
        let cwd = req.body.cwd
        let list = yield fs.readdir(cwd)

        return yield list.map(function*(item){
            try{
                let stat = yield fs.stat( path.join(cwd,item) )
                return {
                    name:item,
                    size:stat.size,
                    mtime:stat.mtime,
                    type: stat.isDirectory() ? 'dir':'file',
                }
            }catch(err){
                return {
                    name:item,
                    type:'unk',
                    err:err.code
                }
            }
        })
    })
}