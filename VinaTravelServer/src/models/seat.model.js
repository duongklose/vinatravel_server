var dbConn = require('./../../config/db.config');

var Seat = function(seat){
    this.id     = seat.id;
    this.name   = seat.name;
};

Seat.getBookedSeats = function(idTrip, result){

    var sql = "SELECT seats.id as id, seats.name FROM seat_ticket_trip, seats WHERE seats.id = seat_ticket_trip.id_seat AND seat_ticket_trip.id_trip="+idTrip;

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
module.exports=Seat;