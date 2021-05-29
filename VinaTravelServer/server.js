const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// Setup server port
const port = process.env.PORT || 5000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a root route
app.get('/', (req, res) => {
  res.send("Welcome to my web server");
});



/* 
  Các routes
 */
//login
require('./src/routes/login.routes')(app)
//register
require('./src/routes/register.routes')(app)
//home
require('./src/routes/home.routes')(app)



// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
