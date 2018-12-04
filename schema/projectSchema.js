var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
	name:String,
	url:String
});

module.exports = projectSchema;