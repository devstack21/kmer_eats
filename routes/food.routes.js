const router = require('express').Router();
const {getAllDataFoodAsc , getDataFoodByCategory , searchDataFoodByName , getDataFoodRandom , getDataFoodById} = require('../controllers/food.controller');
const {adminAuthorize} = require('../middleware/auth.admin.js');
const {getAllDataFood , insertNewDataFood , updateDataFood , deleteDataFood , pushDataFood} = require('../controllers/admin.controller');
const multer = require('multer');

// select path images : path.parse(file).name

//define storage 
const upload = multer() // define options 

router 
    .get('/all-data-food' , getAllDataFoodAsc)
    .get('/all-data-food/:category' ,getDataFoodByCategory )
    .post('/search-data-food' , searchDataFoodByName)
    .get('/data-food/:foodId' , getDataFoodById)
    .get('/data-food-random' , getDataFoodRandom);// food day
    
router 
    .route('/admin-food')
    .get(adminAuthorize , getAllDataFood)  
    .post(adminAuthorize , insertNewDataFood) // add picture 
    .put(adminAuthorize , updateDataFood) //idem
    .delete(adminAuthorize , deleteDataFood)
    .patch(adminAuthorize , pushDataFood); // mettrea jour les données d'un plat : concat

module.exports = router ;

