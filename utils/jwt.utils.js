const jwt = require('jsonwebtoken');
const maxValidityConnection = 60 * 24 * 60 * 60 * 1000;



module.exports  = {

    generateTokenForUser : (id_user) =>{

        return jwt.sign({
            
            userId: id_user
        },
        process.env.SECRET_TOKEN_DECODE_FOR_USER ,
        {
            expiresIn : maxValidityConnection
        }
        );
    },

    generateTokenForDelivery : (id_delivery) =>{

        return jwt.sign({
           userId : id_delivery
        },
        process.env.SECRET_TOKEN_DECODE_FOR_DELIVERY,
        {
            expiresIn : maxValidityConnection
        }
        );
    },

    maxValidityConnection,
};
