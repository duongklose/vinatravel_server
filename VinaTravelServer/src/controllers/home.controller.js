'use strict';
var User = require('../models/user.model');
var Province = require('../models/province.model');
const Trip = require('../models/trip.model');

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

exports.changePass = function(req, res) {
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
        User.changePass(req.query.id, req.query.pass, function(err, mRes) {
          if (err)
          res.send(err);
          console.log('res', mRes);
          var data = {
              "code":"1000",
              "data":null,
              "token":null
            }
          res.send(data);
        });
      }
    });
};

exports.getTrip = function(req, res) {
  Trip.getTrip(req.query.time, req.query.startProvince, req.query.endProvince, function(err, trip){
    if (err)
    res.send(err);
    console.log('trip ', trip);
    res.send(trip);
  });
};

exports.getProvinceByName = function(req, res) {
  Province.getProvinceByName(req.query.name, function(err, province){
    if (err)
    res.send(err);
    console.log('trip ', province);
    res.send(province);
  });
};
  

  //     User.changePass(req.query.id, req.query.pass, function(err, mRes) {
  //       if (err)
  //       res.send(err);
  //       console.log('res', mRes);
  //       var data = {
  //           "code":"1000",
  //           "data":null,
  //           "token":null
  //         }
  //       res.send(data);
  //     });
// };

// exports.getListProvince = function(req, res) {
//   Province.getAllProvince(function(err, province) {
//     console.log('controller')
//     if (err)
//     res.send(err);
//     console.log('res', province);
//     res.send(province);
//   });
// };