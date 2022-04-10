const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {isEmail} = require('validator');

const userSchema = new mongoose.Schema({

    pseudo : {
        type : String , 
        required : [true , 'Le nom doit etre prit en compte'],
        maxlength : 20,
        minlength : 2,
        trimp : true ,
        lowercase : true,
        unique : true 
    },
    email : {
        type : String,
        required : [true ,"email doit etre prit en compte"],
        validate : [isEmail],
        lowercase: true,
        unique : true,
        trim: true,
    },
    password : {
        type : String , 
        required : [true , "le mot de passe doit etre prit en compte"],
        max : 1024,
        minlength : 10,
        unique : true 
    },
    picture :{
        type : String ,
        required : [true , "photo de profil doit etre definit"],
        default : ''
    },

    age : {
        type : Number ,
        required : [true , "l'age doit etre definit"] 
    },

    ville : {
        type : String,
        required : [true , "La ville doit etre definie"]
    },

    nationalite : {
        type : String,
        required : [true, "la nationalite doit etre definit"] 
    },
    date_naissance : {
        type : String ,
        required : [true , "la date de naissance doit etre definie"],
    },

    numero :{
        type : String ,
        required : [true ,"le numero doit etre definit"],
        maxlength : 9,
        unique : true 
    },

    dataCommand: {
        
        type : [
            {   
                deliveryId : String , // id livreur 
                tab_food : [{
                    name_food : String,
                    prix_food : String,
                    origin_food : String,// le lieu de vente du plat 
                    categorie_food : String,
                    picture_food : String 
                }],

                start_command : String ,
                end_command : String 
            }
        ]
    },
    // plat liker
    like_food : {
        type : [String] // add food id 
    },
    
    dataDeliveryOffline : { // possibilite d'utilisation des sessions (express(session))
        
        type : [
            {   
                foodId : String ,
                deliveryId : String ,
                timestamps : String, // date de reception de la demande de livraisonù
            }
        ]
    }
},{
    timestamps : true
});


userSchema.pre("save" , async function(next){
    // hash password 
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password , salt);
    // put string lowercase
    this.pseudo = this.pseudo.toLowercase();
    next();
});

const userModel = mongoose.model('user' , userSchema);

module.exports = userModel;