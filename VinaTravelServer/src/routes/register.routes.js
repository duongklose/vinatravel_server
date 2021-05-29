const express = require('express')
var router = express.Router()

module.exports = function(router) {
    var registerController =   require('../controllers/register.controller');

    router.post('/register', registerController.register);

}