const router = require('express').Router();
const {signUp , signIn , pwdForgot , logout , updateProfile , checkCodeSendByEmail} = require('../controllers/users.auth.controller');
const {updateImageProfile} = require('../controllers/upload.profile.user');
const multer = require('multer');

const upload = multer();

router 
    // management user 
    .post('/routes/signUp' ,signUp )// inscription
    .post('/routes/signIn' , signIn) // login
    .post('/routes/pwdforgot' , pwdForgot) 
    .post('/routes/pwdforgot/checkcode' , checkCodeSendByEmail)
    .post('/logout' , logout) // deconnexion 

    // update data profile
    .put('/profile/:id' , updateProfile)
    .post('/upload/profile-images',updateImageProfile);
    

// router

//     // like food
//     .post('/like/food/:id' , likeFood)
//     .post('/unlike/food/:id', unlikeFood)

//     // search food 

//     .post('/search/foodbyname/:id' , searchFoodByname)
//     .post('/search/foodbyingredients/:id' , searchFoodByIngredients)
//     .post('/get/foodbycategory/:id' , getFoodBycategory)
//     .post('/get/allfood' , getAllFood);


// router
//     // add delivery 

//     .patch('/valid/delivery/:id' , validDelivery)
//     .patch('/unvalid/delivery/:id' , unvalidDelivery); // annuler la demande de livraison d'un livreur 

//  post receipts 
//post('/post-receipts:/:id' , postReceiptsByUser)
//put('/post-receipts/update/:id' , updatePostReceipts)
//delete('/post-receipts/delete/:id' , deletePostReceipts)


//routes api user 


module.exports = router ;