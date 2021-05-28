'use strict';
var dbConn = require('./../../config/db.config');

//User object create

var User = function(user){
  this.id           = user.id;
  this.username     = user.username;
  this.pass         = user.pass;
  this.name         = user.name;
  this.phone        = user.phone;
  this.email        = user.email;
  this.role         = user.role;
};

User.getAll = function (result) {
    dbConn.query("Select * from users", function (err, res) {
        if(err) {
          console.log("error: ", err);
          result(null, err);
        }
        else{
          console.log('users : ', res);
          result(null, res);
        }
    });
};

User.getUserByPhone = function(phone, result){
  dbConn.query("Select * from users where phone=" + phone, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      console.log('users : ', res);
      result(null, res);
    }
  });
}

module.exports= User;