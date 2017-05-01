import axios from 'axios'

const debug = require('debug')('app:api')

//Error response wrapper
export class ApiError extends Error{
    constructor(data){
        if (!data || typeof data!=='object')
            data = {}
        if (!data.message)
            data.message = 'Unkown error'
        data.code |= 0
        if (!data.code)
            data.code = -1

        super(data.message)
        this.name = this.constructor.name
        this.code = data.code|0
        this.data = data
    }
}

//Axios instance
const request = axios.create({
    // baseURL: 'http://localhost:8010',
    baseURL: '/api',
    timeout: 10000
})

//Intercept request start 
//Used for logging and authorization injection 
request.interceptors.request.use(config => {
    // if (config.token){
        // config.headers.authorization = `Bearer ${config.token}`
    // }
    debug('request-start',config.url,config)
    return config
})

//Handle the same way all responses status
request.interceptors.response.use(
    response => handleResponse(null,response),
    err => handleResponse(err,err.response)
)


/**
 * Response handler
 * @param  {Error} err      
 * @param  {Object} AJAX response 
 * @return {Promise}
 */
function handleResponse(err,response){

    //Posible network or config errors
    if (!response)
        response = {}

    if(!response.data){
        response.data = {
            status:false,
            error:{
                code: -2,
                message: err && err.message
            }
        }
    }

    // KO response
    if (!response.data || response.data.status !== true){
        let errorData = response.data && response.data.error
        debug('response-error',errorData)
        return Promise.reject(new ApiError(errorData))
    }

    // OK Response
    debug('response-ok',response.data.data)
    return response.data.data
    // return new Promise((resolve)=>{
        // setTimeout(()=>resolve(response.data.response),1500)
    // })
}


export function list(cwd){
    return request.post('/list',{cwd})
}