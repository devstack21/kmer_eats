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
    
module.exports = router ;