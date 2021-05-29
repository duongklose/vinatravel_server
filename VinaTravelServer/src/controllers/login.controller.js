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
  User.getUserByPhone(req.query.phone, function(err, user) {
    if (err)
    res.send(err);
    if(user.length == 1){
      if(user[0].pass == req.query.pass){
        var data = {
          "code":"1000",
          "data":user[0],
          "token":null
        }
        res.send(data);
      }else{
        var data = {
          "code":"1010",
          "data":null,
          "token":null
        }
        res.send(data);
      }
    }else{
      var data = {
        "code":801,
        "data":null,
        "token":null
      }
      res.send(data);
    }
  });
}