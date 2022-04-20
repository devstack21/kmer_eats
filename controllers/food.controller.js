const moment = require('moment');
const foodModel = require('../mongo.models.connect/models/food.models');
const lodash = require('lodash');
const axios = require('axios');
const {generateRandomNumber} = require('../modules/function');
const foodID = require('mongoose').Types.ObjectId;


exports.getAllDataFoodAsc = async (req, res) =>{

    // get all data food 
    try{

      const dataFood =  await foodModel.find().select('-_id');
      // sort by order alphabetic 
      const OrderByAsc = lodash.orderBy(dataFood , 'name' , 'asc');
      console.log(OrderByAsc);
      // send response at client
      res.status(200).json({
        status : true ,
        message : 'requete get ok',
        data : OrderByAsc,
        time : moment(new Date()).format()
      });
      // set session
      req.session.status = true ;
      req.session.statusCode = 200;
      req.session.message = 'Erreur requete get api food success';
      // log session 
      console.log(req.session);
    
    }catch(err) {

        // set session
        req.session.status = false ;
        req.session.statusCode = 400;
        req.session.message = 'Erreur requete get api food';
        // log session
        console.log(req.session);
        // send message at client 
        return res.status(400).json({
            status : false ,
            message : 'Erreur requete get',
            time : moment(new Date()).format()
        });
    }
    
};
// get all data food by category
exports.getDataFoodByCategory = async (req , res) =>{

    try {
        const dataFood = await foodModel.find().select('-_id');
        // get only data food this catgory
        const datatFoodByCategory = lodash.filter(dataFood , {categorie : req.params.category});
        console.log(datatFoodByCategory);
        // send response at client
        res.status(200).json({
            status : true,
            message : `requete get data category ${req.params.category} success`,
            data : datatFoodByCategory,
            time : moment(new Date()).format()
        });
        // set session
        req.session.status = true ;
        req.session.statusCode = 200;
        req.session.message = 'requete get data catgory '+req.params.category +' sucess';
        // log session
        console.log(req.session);
    } catch (error) {
        
        // set session
        req.session.status = false ;
        req.session.statusCode = 400;
        req.session.message = 'Erreur requete get data';
        //log session
        console.log(req.session);
        // send response at client
        res.status(400).json({
            status : false,
            message : 'Erreur requete get data',
            time : moment(new Date()).format()
        });
    }

};

exports.searchDataFoodByName = async (req , res) =>{

    const {nameFood} = await req.body;

    try {
        const dataFood = await foodModel.find().select('-_id');
        // search element about name
        const dataFoodByName = lodash.find(dataFood , {name : nameFood});

        if (dataFoodByName === undefined ? true : false) {
           // search elemeny on google with serpApi or send event at server_push 
           res.status(200).json({
                status : true ,
                message : 'Désolé aucun plat correspondant a votre recherche', // notification si la recherche est ok
                data : undefined,
                time : moment(new Date()).format()
           });
           // set session 
           req.session.status = true ;
           req.session.statusCode = 200;
           req.session.message = 'Aucun correspondant a la recherche';
           // log session
           console.log(req.session);
        }
        else {
            res.status(200).json({
                status : true ,
                message : 'recherche du plat ok',
                data : dataFoodByName,
                time : moment(new Date()).format()
            });
            // set session
            req.session.status = true ;
            req.session.statusCode = 200;
            req.session.message = 'Recherche plat reussie';
        }
    } catch (error) {
         // set session
         req.session.status = false ;
         req.session.statusCode = 400;
         req.session.message = 'Erreur requete search data food';
         //log session
         console.log(req.session);
         // send response at client
         res.status(400).json({
             status : false,
             message : 'Erreur requete search data food',
             time : moment(new Date()).format()
         });
    }
};

// data food random 
exports.getDataFoodRandom = async (req , res) =>{

    try {
        const dataFood = await foodModel.find().select('-_id');

        let indexFooDay = generateRandomNumber(0 , dataFood.length);

        if (req.session.indexFooDay == undefined){

            req.session.indexFooDay = indexFooDay;

            res.status(200).json({
                status : true ,
                message : 'plat du jour : '+dataFood[indexFooDay].name,
                data : dataFood[indexFooDay],
                time : moment(new Date()).format()
            });
            // set session
            req.session.status = true ;
            req.session.statusCode = 200;
            req.session.message = 'plat du jour : '+dataFood[indexFooDay].name;
            // log session
            console.log(req.session);
        } 
        else {
            if (req.session.indexFooDay == indexFooDay) this.getDataFoodRandom();
        
            else {
                res.status(200).json({
                    status : true ,
                    message : 'plat du jour : '+dataFood[indexFooDay].name,
                    data : dataFood[indexFooDay],
                    time : moment(new Date()).format()
                });
                // set session
                req.session.status = true ;
                req.session.statusCode = 200;
                req.session.message = 'plat du jour : '+dataFood[indexFooDay].name;
                // log session
                console.log(req.session);
            }
        }
        
        
    } catch (error) {
        // set session
        req.session.status = false ;
        req.session.statusCode = 400;
        req.session.message = 'Erreur requete data day food';
        //log session
        console.log(req.session);
        // send response at client
        res.status(400).json({
            status : false,
            message : 'Erreur requete data day food',
            time : moment(new Date()).format()
        });
    }
};

exports.getDataFoodById = async (req , res) =>{

    if (!foodID.isValid(req.params.foodId)){
        return res.status(400).json({
            status : false ,
            message : 'ID FOOD UNKNON',
            time : moment(new Date()).format()
        }); 
    }

    try {
        const dataFood = await foodModel.findById(req.params.foodId);
        res.status(200).json({
            status : true , 
            message : 'data  food '+dataFood.name,
            data : dataFood,
            time : moment(new Date()).format()
        }); 
        // set session
        req.session.status = true ;
        req.session.statusCode = 200;
        req.session.message = 'get data food ok';
        // log session
        console.log(req.session)
    } catch (error) {
        // set session
        req.session.status = false ;
        req.session.statusCode = 400;
        req.session.message = 'Erreur requete data food';
        //log session
        console.log(req.session);
        // send response at client
        res.status(400).json({
            status : false,
            message : 'Erreur requete data food',
            time : moment(new Date()).format()
        });
    }
    
};