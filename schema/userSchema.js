var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: String,
  password: String,
  allowedServer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'server'
  },
  publicKeys: [{
    type: Number
  }]
});

module.exports = userSchema;