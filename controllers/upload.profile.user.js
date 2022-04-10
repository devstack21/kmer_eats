const userModel = require('../mongo.models.connect/models/users.models');
const fs = require('fs');
const {promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);
const moment = require('moment');


exports.updateImageProfile = async (req , res) =>{

    console.log('DATA_ABOUT_FILE : ',req.file);

    try {

        if (req.file == undefined ? true : false) throw Error('Erreur de mis a jour du profil');
        
        if(
            req.file.detectedMimeTtpe !== "image/jpg" &&
            req.file.detectedMimeTtpe !== "image/png" &&
            req.file.detectedMimeTtpe !== "image/jpeg" 
        ) 
        throw Error ('Invalid file');

        if (req.file.size > 500000) throw Error("max size");
        
    } catch (error) {
        // const errors = updateImageProfileError(error);
        return res.status(200).json({
            status : 'failed',
            message : error,
            time : moment(new Date()).format()
        }); 
    }

    const fileName = req.body.pseudo + ".jpg";
    // creation du fichier
    await pipeline(

        req.file.stream,
        
        fs.createWriteStream(
           `${__dirname}/../front_kmer_user_eats/public/upload/profile-pictures/${fileName}` , 
        )
    );
    try {
    
        await userModel.findByIdAndUpdate(req.body.userId , 
        {$set:{
            picture : `/upload/profile-pictures/${fileName}`
            }
        },
        {new : true , upsert : true },
        
        (err , docs) =>{

            if(!err) {
                console.log('URL_IMAGE_PROFILE : ',docs.picture);
                // send response at client
                res.status(200).json({
                    status : 200,
                    message : 'Mis a jour du profil reussie',
                    data : docs,
                    time : moment(new Date()).format()
                });
                // set session
                req.session.status = true;
                req.session.statusCode = 200;
                req.session.message = 'Mis a jour du profile reussie';
                // log session
                console.log(req.session);
            }

            else {
                console.log("Error : ",err);
                //set session
                req.session.status = false ;// en cas d'erreur sur l'application
                req.sesion.statusCode = 400;
                req.session.message = 'Erreur de mis a jour du profil';
                return res.status(400).json({
                    status : false ,
                    message :' Erreur de mis jour de la photo de profile',
                    time : moment(new Date()).format()
                });
            }
        }
        
        )
    } catch (error) {
        // log error
        console.log('Error : ', error);
        // set session
        req.session.status = false ; 
        req.session.statusCode = 400;
        req.session.message = error;
        // log session
        console.log(req.session);
        // send response at client
        return res.status(400).json({
            status : false ,
            message : 'Erreur de mis a jour de la photo de profil',
            time :moment(new Date()).format()
        });
        
    }
};
