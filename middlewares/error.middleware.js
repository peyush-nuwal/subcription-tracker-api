const errorMiddleware = async (err,req,res,next) => {
       try {
           let error = { ...err }
           error.message = err.message
           console.error(err)
        
           // mongoose bad objectId
           if (err.name === 'CastError') {
               let message = 'Resource not found'
               error = new Error(message)
               error.statusCode=404
           }  
           

           // mongoose duplicate key
           if (err.name === 11000) {
               let message = 'Duplicate field value entered'
               error = new Error(message)
               error.statusCode = 400
           }  


           // mongoose duplicate key
           if (err.name === 'ValidationError') {
               let message = Object.values(err.errors).map(val => val.message)
               
               error = new Error(message.join(", "))
               error.statusCode = 400
           }  

           res.status(error.statusCode||500).json({success:false, error:error.messag||"server error"})
  } catch (error) {
     next(error)
  }
}




export default errorMiddleware