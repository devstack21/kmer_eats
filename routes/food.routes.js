const router = require('express').Router();
const {getAllDataFoodAsc , getDataFoodByCategory , searchDataFoodByName , getDataFoodRandom, getAllDataFoodByIngredients} = require('../controllers/food.controller');
const {adminAuthorize} = require('../middleware/auth.admin.food.js');


router 
    .get('/all-data-food' , getAllDataFoodAsc)
    .get('/all-data-food/:category' ,getDataFoodByCategory )
    .post('/search-data-food' , searchDataFoodByName)
    .get('/data-food-random' , getDataFoodRandom);
    
router 
    .route('/admin-data-food')
    .get(adminAuthorize , getAllDataFood)
    .post(adminAuthorize , insertNewDataFood)
    .put(adminAuthorize , updateDataFood)
    .delete(adminAuthorize , deleteDataFood)
    .patch(adminAuthorize , pushDataFood);

module.exports = router ;

