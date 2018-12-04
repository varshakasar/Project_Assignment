var mongoose = require('mongoose');

var serverSchema = new mongoose.Schema({
	id:Number,
	name:String,
	ip:String,
	type:{type:String,enum:['API','UI','Standalone']},
	project:{type: mongoose.Schema.Types.ObjectId,ref:'project'},
	group:{type: mongoose.Schema.Types.ObjectId,ref:'projectgroup'},
	username:{type:String,default:'root'},
	gitUrl:String
});

module.exports = serverSchema;