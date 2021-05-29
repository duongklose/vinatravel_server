const express = require('express')
var router = express.Router()

module.exports = function(router) {
    var loginController =   require('../controllers/login.controller');

    // checkLogin
    // router.get('/checkLogin/:phone/:pass', loginController.checkLogin);
    router.get('/checkLogin', loginController.checkLogin);

    router.get('/users', loginController.getAll);

}