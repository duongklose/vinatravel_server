var dbConn = require('./../../config/db.config');

var Trip = function(trip){
    this.id                 = trip.id;
    this.id_transportation  = trip.id_transportation;
    this.id_coach           = trip.id_coach;
    this.departure_time     = trip.departure_time;
    this.arrival_time       = trip.arrival_time;
    this.departure_location = trip.departure_location;
    this.price              = trip.price;
    this.arrival_location   = trip.arrival_location;
};


Trip.getTrip = function(time, start, end, result){
    console.log('time : ', time);
    console.log('start : ', start);
    console.log('end : ', end);

    var select = "Select trips.id, transportations.name, type.name as typename, trips.departure_time, trips.arrival_time, l1.name as startLocation, trips.price, l2.name as endLocation, transportations.rate_point";
    var from = " from trips, transportations, locations as l1, locations as l2, (SELECT coaches.id, coach_type.name FROM coaches, coach_type WHERE coach_type.id = coaches.type) as type";
    var where = " where trips.id_transportation=transportations.id AND trips.departure_location="+start+" AND trips.arrival_location="+end+" AND trips.departure_time LIKE '"+time+"%' AND trips.id_start_location = l1.id AND trips.id_end_location = l2.id AND trips.id_coach=type.id";
    var sql = select + from + where;
    // var sql = "Select * from trips where departure_location='"+start+"' AND arrival_location='"+end+"' AND departure_time LIKE '"+time+"%';";
    // var sql = "Select `id`, `id_transportation`, `id_coach`, `departure_location`, `price`, `arrival_location` from trips where departure_location='"+start+"' AND arrival_location='"+end+"' AND departure_time LIKE '"+time+"%';";
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


module.exports= Trip;