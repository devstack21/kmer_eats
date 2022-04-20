const router = require('express').Router();
const multer = require('multer');
const upload = multer();


const {
    postReceipts , 

    modifyPostReceipts , 
    
    deletePostReceipts,

    likeReceiptsOnwer,

    unlikeReceiptsOwner,

    likeReceiptsOnly,

    unlikeReceiptsOnly,

    followReceiptsOwner , 

    unfollowReceiptsOwner, 
    
    alertAdminFakePost } = require('../controllers/post-receipts.controller');


router 
    .post('/post-receipts/:id' , postReceipts) // upload.single
    .put('/modifiy-receipts/:id' , modifyPostReceipts)
    .delete('/delete-receipts/:id' , deletePostReceipts)
    .patch('/like-receipts-owner/:id' , likeReceiptsOnwer)
    .patch('/unlike-receipts-owner/:id' , unlikeReceiptsOwner)
    .patch('/like-receipts-only/:id' , likeReceiptsOnly)
    .patch('/unlike-receipts-only/:id' , unlikeReceiptsOnly)
    .patch('/follow-receipts-owner/:id' , followReceiptsOwner)
    .patch('/unfollow-receipts-owner/:id' , unfollowReceiptsOwner)
    .get('/alert-fake-post' , alertAdminFakePost);

module.exports = router ;