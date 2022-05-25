const router = require('express').Router();
const {runCommandFood , selectDeliveryMan , unSelectDeliveryMan , confirmEndDelivery } = require('../controllers/user-delivery.controller');


router 
    .post('/run-command/:id' , runCommandFood)
    .patch('/select-delivery/:id' , selectDeliveryMan )
    .patch('/unselect-delivery' , unSelectDeliveryMan)

module.exports = router;