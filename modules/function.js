const ObjectID = require('mongoose').Types.ObjectId;
const nodeMailer = require('nodemailer');
const moment = require('moment');
/**
 * @param {String} id
 * @returns {Boolean}
*/

exports.checkIDUser = (id) =>{
    if (!ObjectID.isValid(id)) return false ;
    return true ;
};

// method send email 

/**
 * @param {String} email_sender
 * @param {String} email_receiver
*/
exports.sendEmailByNodeMailer = async (email_sender , email_receiver) =>{

};
/**
 *@param {Number} min
 *@param {Number} max
 *@returns {Number} 
*/
exports.generateRandomNumber = (min , max) =>{
    return  Math.floor(Math.random() * (max - min + 1) + min);
};
