'use strict';
//Province object create
// var Province = function(province){
//   this.id           = province.id;
//   this.name         = province.name;
// };

var Province = function(province){
    this.id = province.id;
    this.name = province.name;
};


var dbConn = require('./../../config/db.config');

Province.getAllProvince = function (result) {
    dbConn.query("Select * from provinces", function (err, res) {
        if(err) {
          console.log("error: ", err);
          result(null, err);
        }
        else{
          result(null, res);
        }
    });
};


Province.getProvinceByName = function(name, result){
  dbConn.query("Select * from provinces where name='"+name+"';", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      result(null, res);
    }
});
}

module.exports= Province;