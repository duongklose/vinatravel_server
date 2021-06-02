const express = require('express')
var router = express.Router()

module.exports = function(router) {
    var homeController =   require('../controllers/home.controller');

    router.post('/updateInfo', homeController.updateUser);
    router.post('/changePass', homeController.changePass);
    // router.get('/listProvince', homeController.getListProvince);
    router.get('/getTrip', homeController.getTrip);
    router.get('/getProvince', homeController.getProvinceByName);
    router.get('/getBookedSeats', homeController.getBookedSeats);
    router.get('/getLocation', homeController.getLocationByName);
    router.post('/addNewTicket', homeController.addNewTicket);
    router.post('/completeBookTicket', homeController.completeBookTicket);

}