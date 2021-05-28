'use strict';
var User = require('../models/user.model');

exports.getAll = function(req, res) {
    User.getAll(function(err, user) {
      console.log('controller')
      if (err)
      res.send(err);
      console.log('res', user);
      res.send(user);
    });
};

exports.checkLogin = function(req, res){
  User.getUserByPhone(req.params.phone, function(err, user) {
    if (err)
    res.send(err);
    var resFail = {"message": "fail"};
    var resSuccess = {"message": "success"};
    if(user.length == 1){
      if(user[0].pass == req.params.pass){
        user.unshift(resSuccess);
        res.send(user);
        console.log('res', user);
      }else{
        res.send(resFail);
      }
    }else{
      res.send(resFail);
    }
  });
}