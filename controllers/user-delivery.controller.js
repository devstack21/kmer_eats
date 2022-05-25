const moment = require('moment');
const lodash = require('lodash');
const {checkIDUser} = require('../modules/function');
const userModel = require('../mongo.models.connect/models/users.models');
const CaddieOwn = require('../mongo.models.connect/models/panier');

exports.addFoodInCaddie = async (req ,res) =>{
    //add data in session 
};

exports.removeFoodInCaddie = async (req , res) =>{

};

exports.runCommandFood = async (req ,res) =>{
    // send event server-payment 
    // save data command in a session 
};

exports.selectDeliveryMan = async (req , res) =>{

};
exports.unSelectDeliveryMan = async (req , res) =>{

};

exports.confirmEndDelivery = async (req , res) =>{
        // delete session caddie food : null 
};

exports.getDataDeliveryOffline = async (req , res) =>{
    
};// implementation on server notifications 