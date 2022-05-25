const moment = require('moment');// define format
const foodModel = require('../mongo.models.connect/models/food.models');
const _ = require('lodash');
const{promisify} = require('util');
const pipeline = promisify(require('stream').pipeline);
const fs = require('fs');
const url = require('url');
const path = require('path');
const {checkIDUser} = require('../modules/function');
const userModel = require('../mongo.models.connect/models/users.models');

// method food management 

exports.getAllDataFood = async (req , res) =>{

    try {
        const dataFood = await foodModel.find().select('-_id');
        const orderDataFood = _.orderBy(dataFood , 'name' , 'asc')
        // send data at admin
        res.status(200).json({
            status : true ,
            data : orderDataFood,
            time : moment(new Date()).format()
        });
    } catch (error) {
        return res.status(400).json({
            status : false ,
            data : null ,
            time : moment(new Date()).format()
        });
    }
};


exports.insertNewDataFood = async (req , res) =>{
    // req.file
    const {
        name ,
        description,
        categorie,
        list_ingredients,
        recette ,
    
    } = await req.body ;

    try {
        const newFood = await foodModel.create(
            name ,
            description,
            categorie,
            list_ingredients,
            recette
        );
        // save food 
        newFood.save();
        // log data food 
        console.log('DATA_FOOD : /n ',newFood);
        // send response at client 
        res.status(200).json({
            status : true ,
            message : 'Nouveau plat enregistré avec succes',
            _id : newFood._id,
            time : moment(new Date()).format()
        });
    } catch (error) {
        // const errors = insertNewDataFoodError(error)
        return res.status(400).json({
            status : false ,
            message : 'Echec de post nouveau plat',
            time : moment(new Date()).format()
        });
    }
};


exports.updateDataFood = async (req , res ) =>{

    
    // add pictures
    const {name , description ,categorie, recette } = await req.body;

    // list_ingredients is object model js
    // use multer for update the new pictures for each new ingredients in mongodb 

    try {
        const food = await foodModel.findOne({name});

        if (food){

          
            let filter = { _id : food._id} ;
            let update = {name : name , description : description , categorie : categorie, recette : recette };
            
        
            // new data food
            const newFood = await foodModel.findOneAndUpdate(filter , update , {

                new : true , 
                upsert : true,
                rawResult : true
            });
            // if admin updated food existing in Mongodb

            if (newFood.lastErrorObject.updatedExisting){
                
                res.status(200).json({
                    status : true ,
                    message : 'mis a jour du profil reussie ',
                    data : newFood.value,
                    time : moment(new Date()).format()
                });
                
            }

        }

        else return res.status(400).json({
            status : true ,
            message : 'Le plat est inexistant dans la base de donnéé',
            time : moment(new Date()).format() 
        });

    } catch (error) {
        // const UpdateDataFoodError = require('../utils/errors.utils')
        return res.status(400).json({
            status : true ,
            message : error,
            time : moment(new Date()).format()
        });
    }
};

exports.updateIngredientsFood = async (req , res) =>{
     // req.params.nameIng or req.path
};

exports.deleteDataFood = async (req , res) =>{
    if (!checkIDUser(req.params.foodId)) return res.status(400).json({
        status : false ,
        message : 'ID FOOD UNKNOWN',
        time : moment(new Date()).format()
    });

    try {
       await foodModel.remove({_id : req.params.foodId}).exec();
        res.status(200).json({
            status : true,
            message : 'food deleted success',
            time : moment(new Date()).format()
        });
    } catch (error) {
        return res.status(400).json({
            status : false ,
            message : 'Erreur de suppression',
            time : moment(new Date()).format()
        });
    }
};

exports.pushIngredientsFood = async (req , res ) =>{
    // req.file for pictures ingredients 


    if(!checkIDUser(req.params.foodId)) return res.status(400).json({
        status : false ,
        message : 'ID FOOD UNKNOWN',
        time : moment(new Date()).format()
    });
    // req.file
    // add pictures
    const {name , description , prix , qte_max , qte_min , qte_kg_min ,  qte_kg_max} = dataIng = await req.body ;

    try {
        await foodModel.findByIdAndUpdate(
            req.params.foodId ,

            {
                $push : {
                    list_ingredients : dataIng
 
                }
            },
            (err , result) =>{

                if(!err) res.status(200).json({
                    status : true ,
                    message : `l'ingredients ${name} ajouter avec success`,
                    time : moment(new Date()).format()
                });
                else return res.status(400).json({
                    status : false ,
                    message : err,
                    time : moment(new Date()).format()
                });
            }
            
        );
    } catch (error) {
        return res.status(400).json({
            status : false ,
            message : 'erreur ajout du plat',
            time : moment(new Date()).format()
        });
    }
};

// method user management

exports.getDataUser = async (req , res) =>{

    try {
        const dataUser = await userModel.find();
        //log all data user 
        console.log('DATA_USER : /n', dataUser);
        // asc data 
        const dataAscUser = _.filter(dataUser , 'asc' , 'name');
        // send response at admin
        res.status(200).json({
            status : true ,
            message :'requete ok',
            user : dataAscUser,
            time : moment(new Date()).format()
        });
    } catch (error) {
        return res.status(400).json({
            status : false ,
            message: 'echec de la requete',
            user : null,
            time : moment(new Date()).format()
        }); 
    }
};

exports.deleteDataUser  = async (req , res) =>{
    if (!checkIDUser(req.params.userId)) return res.status(400).json({
        status : false,
        message : 'ID FOOD UNKNOWN',
        time : moment(new Date()).format()
    });
    let user = await userModel.findById(req.params.userId);

    try {
        
        await userModel.remove({_id : req.params.userId}).exec();
        // send response at admin
        res.status(200).json({
            status : true ,
            message : 'user '+user+' deleted success',
            time : moment(new Date()).format()
        });
        
    } catch (error) {
        return res.status(400).json({
            status : false ,
            message : 'error deleted user '+user,
            time : moment(new Date()).format()
        });
    }
    user = null ;
};

exports.pushDataFood = async (req , res) =>{
    
};
