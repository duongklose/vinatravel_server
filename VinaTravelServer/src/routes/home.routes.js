const express = require('express')
var router = express.Router()

module.exports = function(router) {
    var homeController =   require('../controllers/home.controller');

    router.post('/updateInfo', homeController.updateUser);
    router.post('/changePass', homeController.changePass);

}