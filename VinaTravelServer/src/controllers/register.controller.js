'use strict';
var User = require('../models/user.model');

exports.register = function(req, res) {
    User.getUserByPhone(req.query.phone, function(err, user) {
        if (err)
        res.send(err);
        if(user.length >= 1){
            var data = {
              "code":"1011",
              "data":null,
              "token":null
            }
            res.send(data);
        }else{
          User.addUser(req.query.phone, req.query.pass, req.query.name, function(err, mRes) {
            if (err)
            res.send(err);
            console.log('res', mRes);
            var mUser = {
                "id": mRes.insertId,
                "phone": req.query.phone,
                "pass": req.query.pass,
                "name": req.query.name
            }
            var data = {
                "code":"1000",
                "data":mUser,
                "token":null
              }
            res.send(data);
          });
        }
      });
};