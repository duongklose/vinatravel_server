var dbConn = require('./../../config/db.config');

var Ticket = function(ticket){
  this.idTrip               = ticket.idTrip;
  this.idUser               = ticket.idUser;
  this.bookedDate           = ticket.bookedDate;
  this.state                = ticket.state;
  this.startLocation        = ticket.startLocation;
  this.endLocation          = ticket.endLocation;
  this.paymentMethod        = ticket.paymentMethod;
  this.price                = ticket.price;
  this.detailStartLocation  = ticket.detailStartLocation;
  this.detailEndLocation    = ticket.detailEndLocation;
};

Ticket.addNewTicket = function(idTrip, idUser, bookedDate, startLocation, endLocation, paymentMethod, price, detailStartLocation, detailEndLocation, result){
  var insert = "INSERT INTO `tickets`( `id_trip`, `id_user`, `book_date`, `state`, `start_location`, `end_location`, `payment_method`, `price`, `detail_departure_location`, `detail_arrival_location`)";
  var values = " VALUES ('"+idTrip+"','"+idUser+"','"+bookedDate+"','booked','"+startLocation+"','"+endLocation+"','"+paymentMethod+"',"+price+",'"+detailStartLocation+"','"+detailEndLocation+"');"
  var sql = insert + values;
  dbConn.query(sql, function(err, res){
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      result(null, res);
    }
  });
}

Ticket.completeBookTicket = function(idSeat, idTrip, idTicket, result){
  var sql = "INSERT INTO `seat_ticket_trip`( `id_seat`, `id_trip`, `id_ticket`) VALUES ("+idSeat+","+idTrip+","+idTicket+");";
  dbConn.query(sql, function(err, res){
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      result(null, res);
    }
  })
}

module.exports = Ticket;