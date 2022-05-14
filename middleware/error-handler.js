const { StatusCodes } = require("http-status-codes");
const { CustomAPIError } = require("../errors");


const errrorHandlerMiddleware = (err, req, res, next) => {
    console.log(err)
    
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong try again later',
    }


    if (err.name == 'ValidationError'){
        customError.msg = Object.values(err.errors).map((item) =>item.message).join(',')
        customError.statusCode = 400
    }
    if (err.code && err.code === 'P2002'){
        customError.msg = `The ${err.meta.target} exists`
        customError.statusCode = 400
    }

    if (err.code && err.code == 'P2025'){
        customError.msg = err.meta.cause
        customError.statusCode = 400
    }

    if (err instanceof CustomAPIError){
        return res.status(err.statusCode).json({message:err.message})
    }
    return res.status(customError.statusCode).json({message:customError.msg})
}

module.exports = errrorHandlerMiddleware