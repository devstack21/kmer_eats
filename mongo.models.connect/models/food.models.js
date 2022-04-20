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
                localisation : String ,
                prix : String , // prix du plat pour chaque boutique 

            }
        ],// informations concernant les boutiques vendant ce plat
        
    },

    picture :{
        type : String ,
        default : ''
    },
    // description du plat 
    description : {
        type : String ,
        lowercase : true ,
        maxlength : 50
    },
    prix : {
        type : String ,
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
                qte_min : Number,
                qte_max : Number,
                qte_kg_min : String,
                qte_kg_max : String ,

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
    },
    owner : {
        type : {
            prix_owner : String ,
            ownerId : String // id user 
        },
        
    }

},{
    timestamps : true
});

foodSchema.pre('save' , function (next) {
    this.name = this.name.toLowerCase();
    this.description = this.description.toLowerCase();
    this.recette = this.recette.toLowerCase();
    this.categorie = this.categorie.toLowerCase();
    
    next();
});

const foodModel = mongoose.model('food' , foodSchema);

module.exports = foodModel ;