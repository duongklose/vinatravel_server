'use strict';
const User = require('../models/user.model');

exports.getAll = function(req, res) {
    User.getAll(function(err, user) {
      console.log('controller')
      if (err)
      res.send(err);
      console.log('res', user);
      res.send(user);
    });
};