'use strict';
var User = require('../models/user.model');
var Province = require('../models/province.model');
const Trip = require('../models/trip.model');
var Seat = require('../models/seat.model');
var Location = require('../models/location.model');
var Ticket = require('../models/ticket.model');

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

exports.getBookedSeats = function(req, res) {
  Seat.getBookedSeats(req.query.idTrip, function(err, seats){
    if (err)
    res.send(err);
    console.log('seat ', seats);
    res.send(seats);
  });
};
  
exports.getLocationByName = function(req, res) {
  Location.getLocationByName(req.query.location, function(err, idLocation){
    if(err)
    res.send(err);
    res.send(idLocation);
  });
};

exports.addNewTicket = function(req, res){
  Ticket.addNewTicket(req.query.idTrip, req.query.idUser, req.query.bookedDate, req.query.startLocation, req.query.endLocation, req.query.paymentMethod, req.query.price, req.query.detailStartLocation, req.query.detailEndLocation, function (err, mRes){
    if (err)
      res.send(err);
    console.log('res', mRes);
    var data = {
        "code":"1000",
        "data":mRes.insertId
      }
    res.send(data);
  });
}

exports.completeBookTicket = function(req, res){
  Ticket.completeBookTicket(req.query.idSeat, req.query.idTrip, req.query.idTicket, function(err, mRes){
    if (err)
      res.send(err);
    console.log('res', mRes);
    var data = {
        "code":"1000",
        "data":mRes.insertId
      }
    res.send(data);
  })
}

exports.getMyTicket = function(req, res){
  Ticket.getMyTicket(req.query.idUser, req.query.d, function(err, mRes){
    if (err)
      res.send(err);
    var data = {
        "code":"1000",
        "data":mRes
      }
    res.send(data);
  });
}

exports.getOldTicket = function(req, res){
  Ticket.getOldTicket(req.query.idUser, req.query.d, function(err, mRes){
    if (err)
      res.send(err);
    var data = {
        "code":"1000",
        "data":mRes
      }
    res.send(data);
  });
}

exports.getCancelledTicket = function(req, res){
  Ticket.getCancelledTicket(req.query.idUser, function(err, mRes){
    if (err)
      res.send(err);
    var data = {
        "code":"1000",
        "data":mRes
      }
    res.send(data);
  })
}

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