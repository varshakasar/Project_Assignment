var mongoose = require('mongoose');

var projectGroupSchema = new mongoose.Schema({
	id:Number,
	name:String
});

module.exports = projectGroupSchema;