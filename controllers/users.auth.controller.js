const {generateTokenForUser , maxValidityConnection} = require('../utils/jwt.utils');
const moment = require('moment');
const userModel = require('../mongo.models.connect/models/users.models');
const {signUpErrors , signInErrors , mdpForgotErrors} = require('../utils/errors.utils');
const bcrypt = require('bcrypt');
const {checkIDUser , generateRandomNumber } = require('../modules/function');

/**
 * @param {Object} user
 * @returns {Array | String }
 * @private
*/

function checkDataEmptyAndUpdate (user) {
    // user first elt 
    let tab = checkDataEmptyAndUpdate.arguments;

    for(let i = 1 ; i < tab.length ; i++){
        
        if(tab[i] == ""  && i == 1) tab[i] = user.pseudo; 
        if(tab[i] == ""  && i == 2) tab[i] = user.email;
        if(tab[i] == ""  && i == 3) tab[i] = user.password;
        if(tab[i] == undefined  && i == 4) tab[i] = user.age;
        if(tab[i] == ""  && i == 5) tab[i] = user.ville;
        if(tab[i] == ""  && i == 6) tab[i] = user.nationalite;
        if(tab[i] == ""  && i == 7) tab[i] = user.date_naissance;
        if(tab[i] == ""  && i == 8) tab[i] = user.numero;
    }
    return tab ;
};

exports.signUp = async (req , res) =>{
    // control data undefined front end 

    const {pseudo , email , password , picture , age , ville , nationalite  , date_naissance ,numero  } = await req.body;

    try {
        const newUser = await userModel.create({pseudo , email , password , picture , age , ville , nationalite, date_naissance , numero });
        // save user in db 
        newUser.save();
        // response server
        res.status(200).json({
            status : true , 
            message : 'signup successfully',
            _id : newUser._id,
            time : moment(new Date()).format()// define format date 
        });
        // set session
        req.session.status  = true ;
        req.session.message = 'signup successfully';
        req.session.statusCode = 200;
        // log data and session
        console.log(req.session);
        console.log(newUser);

    } catch (error) {

        //const errors = signUpErrors(error);
        console.log(error);
        // response server
        res.status(400).json({
            status : false ,
            message : error,
            time : moment(new Date()).format()
        });
        // set session
        req.session.status = false;
        req.session.statusCode = 400;
        req.session.message = error;
    }
};

exports.signIn = async (req , res ) =>{

    const {email , password} = await req.body;

    try {
        const user = await userModel.findOne({email});

        const ifPassword = await bcrypt.compare(password , user.password );

        if (!ifPassword){

            // forget password 
            console.log('password unknow user : ',user.pseudo);
            res.status(400).json({
                status : false ,
                message : 'Mot de passe incorrect',
                time : moment(new Date()).format()
            });
            // set session 
            req.session.status = false;
            req.session.statusCode = 400;
            req.session.message = 'Mot de passe incorrect';
            // log session
            console.log(req.session);

        }else {
            const token = generateTokenForUser(user._id);
            // create jwt cookie
            res.cookie('jwt' , token , {httpOnly : true , maxValidityConnection});
            // send response client
            res.status(200).json({
                status : true , 
                message : 'signIn succesfully',
                token : token,
                expiresIn : maxValidityConnection,
                data : user,
                time : moment(new Date()).format()
            });
            // set session
            req.session.status = true ;
            req.session.statusCode = 200;
            req.session.message = 'signIn sucessfully';
            // log session
            console.log(req.session);
        }

    } catch (error) {
        //const errors = signInErrors(error);
        console.log('Error : ',error);
        res.status(400).json({
            status : false , 
            message : error,
            time : moment(new Date()).format()
        });
        // set session
        req.session.status = false ;
        req.session.statusCode = 400;
        req.session.message = error;
        // log session
        console.log(req.session);
    }
};

exports.pwdForgot = async (req ,res) =>{
    const {email} = await req.body;

    try {
       // send mail
       const user = await userModel.findOne({email});
       let numberRandom = generateRandomNumber(5, 45);
       const code = user.password.slice(-numberRandom).slice(0, 5);
       console.log('CODE : ', code);
       // set session
       req.session.email = email;
       req.session.timeout = new Date().getMinutes() + 10; 
       req.session.code = code ;

       // send mail && create session email : req.session.email = email && req.session.statusError = false
        res.status(200).json({
            status : true,
            code : code ,
            message : "le code va expirer dans 10 minutes",
            time : moment(new Date()).format()
        });

    } catch (error) {
        //const errors = mdpForgotErrors(error);
        console.log('Error : ',error);
        res.status(200).json({
            status : false ,
            message : error,
            time : moment(new Date()).format()
        });
        // set session
        req.session.message = error;
    }
};

exports.checkCodeSendByEmail = async (req , res) =>{

    const email = req.session.email , {code} = await req.body , user =  await userModel.findOne({email});
    console.log(new Date().getMinutes() , req.session.timeout);

    if (req.session.code === code && new Date().getMinutes() < req.session.timeout ? true : false) {

        res.status(200).json({
            status : true , 
            message : 'connection succesfully',
            time : moment(new Date()).format()
        });
        // set session
        req.session.email = null;
        req.session.timeout = null;
        req.session.status = null;
        req.session.code = null;
        req.session.statusCode = 200;
        req.session.message = 'connection successfully';
        // log session
        console.log(req.session);
    }
    else {

        res.status(200).json({
            status : false , 
            message : 'code not correct',
            time : moment(new Date()).format()
        });
       req.session.message = 'code not correct';
    }

};

exports.logout = async (req , res) =>{

    try {
    
        // initialize token && cookie
        res.cookie('jwt' , {maxAge : 1});
        // send response client
        res.status(200).json({
            status : true ,
            message : 'deconnexion success',
            time : moment(new Date()).format()
        });
        
    } catch (error) {
        // const errors = logoutErrors(error)

        res.status(400).json({
            status : false,
            message : error,
            time : moment(new Date()).format()
        });
        // set session
        req.session.status = false;
        req.session.statusCode = 400;
        req.session.message = error;
        // log session
        console.log(req.session);
    }
    
};

exports.updateProfile = async (req , res) =>{

    if(!checkIDUser(req.params.id)) {

        console.log('ID UNKNOWN')
        // set session 
        req.session.status = false;
        req.session.statusCode = 400;
        req.session.message = 'ID UNKNOWN' // possibilite de notification du user
        // log session
        console.log(req.session);
        
        // return error
        return res.status(400).json({
            status : false,
            message : 'ID UNKNOWN',
            time : moment(new Date()).format()
        });
        
    }
    // get request body
    const {pseudo ,  email , password ,age , ville , nationalite , date_naissance ,numero  } = await req.body;

    const user = await userModel.findById(req.params.id);
    
    let updateData = checkDataEmptyAndUpdate(user , pseudo , email , password , picture , age , ville , nationalite , date_naissance ,numero )
    
    try {
        const filter = {_id : req.params.id} , update = {
            pseudo : updateData[1],
            email : updateData[2],
            password : updateData[3],
            age : updateData[4],
            ville : updateData[5],
            nationalite : updateData[6],
            date_naissance : updateData[7],
            numero : updateData[8]
        };
       
        const doc =  await userModel.findOneAndUpdate(filter , update ,{

            new : true,
            upsert : true ,
            rawResult : true // log data driver mongodb 
        });
        
        // The below property will be `false` if MongoDB upserted a new
        // document, and `true` if MongoDB updated an existing object.
        if (doc.lastErrorObject.updatedExisting){
            res.status(200).json({
                status : true ,
                message : 'mis a jour du profil reussie ',
                data : doc.value,
                time : moment(new Date()).format()
            });
            // set session 
            req.session.status = true ;
            req.session.statusCode = 200;
            req.session.message = 'mis a jour du profil reussie ';
            // log session
            console.log(req.session);
        }
       

    } catch (error) {

        console.log('Error : ',error);
        // set session
        req.session.status = false ;
        req.session.statusCode = 400;
        req.session.message = error;
        // log session
        console.log(req.session);

        // return error client
        // const errors = updateProfile(error);
        return res.status(400).json({
            status : false,
            message : error,
            time : moment(new Date()).format()
        });
       
    }
    
    
};


// https://www.youtube.com/watch?v=ALnJLbjI7EY : auth jwt react native
//https://javascript.plainenglish.io/react-native-cookie-authentication-83ef6e84ba70 : auth jwt rn

