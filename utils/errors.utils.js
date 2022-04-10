const moment = require('moment');


exports.ErrorConnectionMongodb = (error) =>{

    console.log(error);

    return "Erreur de connexion a la base de donnée";
   
};

exports.ErrorMiddlewareConnetionMongodb = (req , res , error) =>{

        res.status(400).json({
            status : false,
            message : error,
            time : moment(new Date()).format()// definition format date 
        });
};

// error signup && login 

exports.signUpErrors = (err) => {
    
    let errors = {pseudo : '' , email : '', password : '' , numero : ''};
    
    if (err.message.includes('pseudo')) errors.pseudo = 'pseudo incorrect';

    if (err.message.includes('email')) errors.pseudo = 'email incorrect';

    if (err.message.includes('password')) errors.password = 'password must have 10 character';

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('pseudo')) errors.pseudo = 'email already exist ';
    
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('email')) errors.pseudo = 'pseudo already exist ';

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('password')) errors.pseudo = 'password already exist ';

    return errors;
};

exports.signInErrors = (err) => {

    let errors = {email : '' , password :''};

    if (err.message.includes('email')) errors.email = 'email incorrect';

    if (err.message.includes('password')) errors.pseudo = 'password incorrect';

    return errors ;

};


exports.mdpForgotErrors = (err) =>{

    let errors =  {email : '' };

    if (err.message.includes('email')) errors.email = 'email incorrect';

    return errors ;
    
};