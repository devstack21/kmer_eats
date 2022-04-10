const jwt = require('jsonwebtoken');
const userModel = require('../mongo.models.connect/models/users.models');
const {checkIDUser} = require('../modules/function');

exports.checkConnectionUserAppMobile = async (req , res , next) =>{

    // get cookies app client
    // check if token exist  : si le token a été crée 

    const token = await req.cookies.jwt ;

    // check token exist
    if (token) {
        try {
            jwt.verify(token , process.env.SECRET_TOKEN_DECODE_FOR_USER , async (err , tokenDecrypted) =>{
    
                if (err){
                    req.session.user = null ;
                    // set session
                    req.session.status = false;
                    req.session.message = 'Désolé erreur de connexion';
                    // retry send response at client
                    // setTimeout(() => {
                    //     this.checkConnectionAppMobile();
                    // }, 3000);
                    

                }else {
                    const user = await userModel.findById(tokenDecrypted.userId);
                    // user don't exist 
                    if(!checkIDUser(user._id)) {
                        // set session
                        req.session.user = null ;
                        req.session.message = 'aucun compte';
                        next();
                    }
                   
                    else {
                        req.session.user = user ;
                        req.session.status = true ;
                        next();
                    }
                }  
            });
    
        } catch (error) {
            req.session.user = null ;
            req.session.status = false ;
            req.session.message =error;
            // retry send response at client
            
        }
    }
    // if token not define 
    else {
        // set session 
        req.session.user = null ;
        req.session.message = 'aucun compte ';
        next();
    }
    
};
