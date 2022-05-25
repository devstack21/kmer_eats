// possibilité d'avoir une interface admin
// auth with jwt 

const moment = require('moment');
const jwt = require('jsonwebtoken');


exports.adminAuthorize = async (req , res , next) =>{

    const {passwd} = await req.body ;

    if (passwd !== 'devStack21ing') return res.status(401).json({
        status : false ,
        message : "don't authorize ",
        time : moment(new Date()).format()
    });

    else next();
};