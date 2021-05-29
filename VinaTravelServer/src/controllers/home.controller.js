'use strict';
var User = require('../models/user.model');

exports.updateUser = function(req, res) {
    User.getUserById(req.query.id, function(err, user) {
        if (err)
        res.send(err);
        if(user.length != 1){
            var data = {
              "code":"1005",
              "data":null,
              "token":null
            }
            res.send(data);
        }else{
          User.updateUser(req.query.id, req.query.phone, req.query.name, function(err, mRes) {
            if (err)
            res.send(err);
            console.log('res', mRes);
            var mUser = {
                "id": req.query.id,
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