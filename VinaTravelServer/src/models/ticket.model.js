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

Ticket.getMyTicket = function(idUser, date, result){
  var select = "SELECT tickets.id as id, transportations.name as nameTransportationCompany, coaches.license_plate as licensePlate, tickets.book_date, l1.name as defaultStartLocation, l2.name as defaultEndLocation, tickets.detail_departure_location as startLocation, tickets.detail_arrival_location as endLocation, trips.departure_time as startTime, trips.arrival_time as endTime, trips.departure_time as d, tickets.price as price";
  var from = " FROM tickets, trips, transportations, coaches, locations as l1, locations as l2";
  var where = " WHERE id_user="+idUser+" AND trips.departure_time > '"+date+"' AND state='booked' AND tickets.id_trip=trips.id AND trips.id_transportation=transportations.id AND trips.id_coach=coaches.id AND tickets.start_location=l1.id AND tickets.end_location=l2.id";
  var sql = select + from + where;
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

Ticket.getOldTicket = function(idUser, date, result){
  var select = "SELECT tickets.id as id, transportations.name as nameTransportationCompany, coaches.license_plate as licensePlate, tickets.book_date, l1.name as defaultStartLocation, l2.name as defaultEndLocation, tickets.detail_departure_location as startLocation, tickets.detail_arrival_location as endLocation, trips.departure_time as startTime, trips.arrival_time as endTime, trips.departure_time as d, tickets.price as price";
  var from = " FROM tickets, trips, transportations, coaches, locations as l1, locations as l2";
  var where = " WHERE id_user="+idUser+" AND trips.departure_time < '"+date+"' AND state='booked' AND tickets.id_trip=trips.id AND trips.id_transportation=transportations.id AND trips.id_coach=coaches.id AND tickets.start_location=l1.id AND tickets.end_location=l2.id";
  var sql = select + from + where;
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

Ticket.getCancelledTicket = function(idUser, result){
  var select = "SELECT tickets.id as id, transportations.name as nameTransportationCompany, coaches.license_plate as licensePlate, tickets.book_date, l1.name as defaultStartLocation, l2.name as defaultEndLocation, tickets.detail_departure_location as startLocation, tickets.detail_arrival_location as endLocation, trips.departure_time as startTime, trips.arrival_time as endTime, trips.departure_time as d, tickets.price as price";
  var from = " FROM tickets, trips, transportations, coaches, locations as l1, locations as l2";
  var where = " WHERE id_user="+idUser+" AND state='cancelled' AND tickets.id_trip=trips.id AND trips.id_transportation=transportations.id AND trips.id_coach=coaches.id AND tickets.start_location=l1.id AND tickets.end_location=l2.id";
  var sql = select + from + where;
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

Ticket.getSeatsByTicket = function(idTicket, result){
  var sql = "SELECT seat_ticket_trip.id_seat, seats.name FROM seat_ticket_trip, seats WHERE seat_ticket_trip.id_seat=seats.id AND id_ticket=" + idTicket;
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

Ticket.cancelTicket = function(idTicket, result){
  var sql = "UPDATE tickets SET state='cancelled' WHERE id = "+idTicket;
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

Ticket.deleteSeatsTicket = function(idTicket, result){
  var sql = "DELETE FROM `seat_ticket_trip` WHERE id_ticket=" + idTicket;
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

// SELECT * FROM `tickets`
// WHERE DATE(book_date)>'2021-06-03'