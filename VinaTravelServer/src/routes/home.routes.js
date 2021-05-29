const express = require('express')
var router = express.Router()

module.exports = function(router) {
    var loginController =   require('../controllers/home.controller');

    router.post('/updateInfo', loginController.updateUser);

}