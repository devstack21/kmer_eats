const moment = require('moment');
const lodash = require('lodash');
const userModel = require('../mongo.models.connect/models/users.models');
const foodModel = require('../mongo.models.connect/models/food.models');
const Caddie = require('../mongo.models.connect/models/panier');
const {checkIDUser} = require('../modules/function');
const {updateImageProfileError} = require('../utils/errors.utils');
const {promisify} = require('util');
const pipeline = promisify(require('stream').pipeline);
const fs = require('fs');


// poster une recette
exports.postReceipts = async (req , res) =>{
    
    if(!checkIDUser(req.params.id)) {
        // set session
        req.session.status = false ;
        req.session.statusCode = 400;
        req.session.message = 'ID UNKNOWN';
        //log session
        console.log(req.session);
        // send response at client
        return res.status(400).json({
            status : false ,
            message : 'ID UNKNOWN',
            time : moment(new Date()).format()
        });
    }

    const {name , description , list_ingredients , recette , owner } = await req.body ;
    
    try {
        const newFood = await foodModel.create({
            name ,
            description,
            list_ingredients,
            recette,
            owner
        });

        // save food
        newFood.save();

        // send response at client 
        res.status(200).json({
            status : true ,
            message : 'Nouveau plat enregistré',
            data : newFood._id,
            time : moment(new Date()).format()
        });
        // push data 
        const newUser  = await userModel.findByIdAndUpdate(
            
            req.params.id ,
            
            {$addToSet : {
                postfood : newFood._id
                }
            },
            {new : true , upsert : true }
        );

        // log data postfood
        let lengthFood = newUser.postfood.length;
        console.log(newUser.postfood[lengthFood]);
        lengthFood = undefined;

        // set session
        req.session.status = true ;
        req.session.statusCode = 200;
        req.session.message = 'Nouveau plat enregistré';
        // log session
        console.log(req.session);

    } catch (error) {
        // set session
        req.session.status = false ;
        req.session.statusCode = 400;
        req.session.message = 'Echec de post nouveau plat';
        // log session
        console.log(req.session);
        // send response error at client
        return res.status(400).json({
            status : false ,
            message : 'Echec de post nouveau plat',
            time : moment(new Date()).format()
        });
    }
    
};

exports.uploadImagesFood = async (req , res) =>{
    // log data file
    console.log('DATA_FILE : '+req.file);

    try {
        if (
            req.file.detectedMimeTtpe !== "image/jpg" &&
            req.file.detectedMimeTtpe !== "image/png" &&
            req.file.detectedMimeTtpe !== "image/jpeg" 
        ) throw new Error('Invalid file');

        if (req.file.size > 500000) throw new Error('max size');

    
    } catch (error) {
        // const errors = updateImageProfileError(error);
        // set session
        req.session.status = false;
        req.session.statusCode = 400;
        req.session.message = error ; // errors
        // log session
        console.log(req.session);
        // send response error at client
        return res.status(400).json({
            status : false ,
            message : error,
            time : moment(new Date()).format()
        });
    }

    let t = new Date() , _id = req.params.id;

    const fileName = _id+''+t.getFullYear()+'_'+t.getHours()+'_'+t.getMinutes()+'_'+t.getSeconds()+".jpg";
    
    // creation du fichier
    await pipeline(

        req.file.stream,
        
        fs.createWriteStream(
           `${__dirname}/../front_kmer_user_eats/public/upload/food-pictures/${fileName}` , 
        )
    );
    try {
    
        await userModel.findByIdAndUpdate(req.body.userId , 
        {$set:{
            picture : `/upload/food-pictures/${fileName}`
            }
        },
        {new : true , upsert : true },
        
        (err , docs) =>{

            if(!err) {
                console.log('URL_IMAGE_FOOD : ',docs.picture);
                // send response at client
                res.status(200).json({
                    status : 200,
                    message : 'Enregistrement images du plat reussie',
                    data : docs,
                    time : moment(new Date()).format()
                });
                // set session
                req.session.status = true;
                req.session.statusCode = 200;
                req.session.message = 'Enregistrement images du plat reussie';
                // log session
                console.log(req.session);
            }

            else {
                console.log("Error : ",err);
                //set session
                req.session.status = false ;// en cas d'erreur sur l'application
                req.sesion.statusCode = 400;
                req.session.message = 'Erreur enregistrement images du plat ';
                return res.status(400).json({
                    status : false ,
                    message :' Erreur enregistrement images du plat ',
                    time : moment(new Date()).format()
                });
            }
        }
        
        );
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
            message : 'Erreur enregistrement images du plat',
            time :moment(new Date()).format()
        });
        
    }
};

//modifier une recette 
exports.modifyPosteceipts = async (req , res) =>{

};
// supprimer un post recette
exports.deletePostReceipts = async (req , res) =>{

};

// liker une recette owner

exports.likeReceiptsOnwer = async (req , res) =>{

};

// unliker une recette owner
exports.unlikeReceiptsOwner = async (req , res) =>{

};

exports.shareLinkReceiptsOwner = async (req , res) =>{

};

// liker recette only
exports.likeReceiptsOnly = async (req , res) =>{

};

// unlike recette only
exports.unlikeReceiptsOnly = async (req , res) =>{

};

// share lien de la recette only
exports.shareLinkReceiptsOnly = async (req , res ) =>{

};

// s'abonner a un owner receipts 
exports.followReceiptsOwner = async (req , res) =>{

};

//desabonner
exports.unfollowReceiptsOwner = async (req , res) =>{

};

// alert admin for fake post 
exports.alertAdminFakePost = async (req , res) =>{
    // send postId && userId : notification 
};
