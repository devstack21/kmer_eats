const router = require('express').Router();
const {getAllDataFoodAsc , getDataFoodByCategory , searchDataFoodByName , getDataFoodRandom , getDataFoodById} = require('../controllers/food.controller');
const {adminAuthorize} = require('../middleware/auth.admin.js');
const {getAllDataFood , insertNewDataFood , updateDataFood , deleteDataFood , pushDataFood} = require('../controllers/admin.controller');

router 
    .get('/all-data-food' , getAllDataFoodAsc)
    .get('/all-data-food/:category' ,getDataFoodByCategory )
    .post('/search-data-food' , searchDataFoodByName)
    .get('/data-food/:foodId' , getDataFoodById)
    .get('/data-food-random' , getDataFoodRandom);// food day
    
router 
    // admin routes
    .route('/admin-data-food')
    .get(adminAuthorize , getAllDataFood)
    .post(adminAuthorize , insertNewDataFood)
    .put(adminAuthorize , updateDataFood)
    .delete(adminAuthorize , deleteDataFood)
    .patch(adminAuthorize , pushDataFood);

module.exports = router ;

