var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema(
	{
		name: {type: String, required: true, max: 100},
		typeOfEvent: {type: String, required: true, max: 100},
		location: {type: String, max: 100}
	}
)

//Virtual for patient's full name
eventSchema
	.virtual('title')
	.get(function(){
		return this.name;
	});

//Virtual for patient's URL
eventSchema
	.virtual('url')
	.get(function(){
		return '/event/' + this._id;
	});

module.exports = mongoose.model('event', eventSchema);
