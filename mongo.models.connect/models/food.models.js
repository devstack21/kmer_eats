const mongoose = require('mongoose');


const foodSchema = new mongoose.Schema({
    name : {
        type : string ,
        required : true ,
        unique : true ,
        trimp : true
    },

    origin_buy : {
        type : [
            {
                name : String, // nom boutique 
                numero : {
                    type : String ,
                    required : true , 
                    maxlength : 10
                },
                ville : String ,
                pays : String ,
                localisation : String 

            }
        ],// nformations concernant les boutiques vendant ce plat
        
    },

    picture :{
        type : String 
    },
    description : {
        type : String ,
        lowercase : true ,
        maxlength : 50
    },
    prix : {
        type : String ,
        required : true ,
    },
    likers : {
        type : [String] // userId 
    },
    categorie : {
        type : String 
    },
    list_ingredients :{
        type : [
            {
                name : String ,
                description : String ,
                prix : String,
                picture : String ,
                qte_minim : Number,
                qte_max : Number,
                qte_kg_minim : String,
                qte_kg_max : String ,
                origin_buy : [

                ] // origine de l'achat 
            }
        ],
        required : true ,
        unique : true 
    },
    recette :{
        type : String,
        required : true ,
        unique : true ,
        minlength : 10,
        maxlength : 200
    }

},{
    timestamps : true
});

const foodModel = mongoose.model('food' , foodSchema);

module.exports = foodModel ;