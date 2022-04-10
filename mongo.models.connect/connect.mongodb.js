const mongoose = require('mongoose');

const {ErrorConnectionMongodb , ErrorMiddlewareConnetionMongodb}  = require('../utils/errors.utils');

const MONGO_ADDRESS = `mongodb://${process.env.ADDRESS}:${process.env.MONGO_PORT}/${process.env.MONGO_BD_NAME}`;

// connectio with mongodb 

exports.connectionRetryMongodb = async () => {

   mongoose

   .connect(MONGO_ADDRESS)

   .then(() => {

        console.log('Connection with mongodb sucessfully ');
   })

   .catch((error) => {

        const errors = ErrorConnectionMongodb(error);
        console.log('Error : ',errors);

        //send message client
        ErrorMiddlewareConnetionMongodb(errors);
        // retry connection with db mongodb 
        setTimeout(() => {

          connectionRetryMongodb();  
          
        }, 5000);
        
   });

};