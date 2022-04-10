const moment = require('moment');

// method middleware

exports.getURLRequestHTTP = async (req , res , next) =>{
    
    try{ 
        urlRequestHTTP = await req.url ;
        console.log('URL_REQUEST_CLIENT : ' , urlRequestHTTP);
        
    }catch(errorHTTPRequest) {
        console.log('Error request client');
        res.status(404).json({
            status : 'failed',
            message : 'request not valid',
            time : moment(new Date())
        });
    }
    
    next();
  
};
