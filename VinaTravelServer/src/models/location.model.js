var dbConn = require('./../../config/db.config');

var Location = function(location){
    this.id     = location.id;
    this.name   = location.name;
};

Location.getLocationByName = function(location, result){
    var sql = "SELECT * FROM locations WHERE name LIKE '%"+location+"%'";
    dbConn.query(sql, function (err, res) {
        if(err) {
          console.log("error: ", err);
          result(null, err);
        }
        else{
          var r = {
            "code":"1000",
            "data":res
          }
          result(null, r);
        }
      });
}

module.exports = Location;
