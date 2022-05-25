
const foodModel = require('./food.models');
const moment = require('moment');
const _ = require('lodash');


class CaddieOwn {

   
    constructor(){
        this.tabFood = [];
    }

    // add element food in tab
   /**
    * @param {String} foodId
    * @param {Function} cb
    * @returns {void}
    * @public
   */

    async addFoodCaddie(foodId , cb){
        this.tabFood.push(
                {
                   foodId : foodId,
                   timeAdd: moment(new Date()).format() // define format date 
                }
            );
        await foodModel.findById(foodId , (err , dataFood) =>{

            if (!err) cb(dataFood);
            else this.addFoodCaddie(foodId , cb);
        });

    }

    // remove element food in tab
    /**
     * @param {String} foodId
     * @param {Function} cb
     * @returns {void}
     * @public
    */
   async removeFoodCaddie(foodId , cb){
       let dataFoodId = await _.find(this.tabFood , {foodId : foodId});
       let index = this.tabFood.indexOf(dataFoodId);
       delete this.tabFood[index];
       await foodModel.findById(foodId , (err , dataFood) =>{

        if(!err) cb(dataFood);
        else this.removeFoodCaddie(foodId , cb);
       });
       // put data empty
       dataFoodId = null ;
       index = null ; 
   }
   /**
    * @returns {Array | String}
    * @public
   */
   getDataFoodCaddie(){
       return this.tabFood;
   }
  
}


module.exports = {CaddieOwn};