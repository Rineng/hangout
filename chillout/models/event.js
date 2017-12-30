var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema(
	{
		first_name: {type: String, required: true, max: 100},
		last_name: {type: String, required: true, max: 100},
	}
)

//Virtual for patient's full name
eventSchema
	.virtual('name')
	.get(function(){
		return this.las_name + ', ' + this.first_name;
	});

//Virtual for patient's URL
eventSchema
	.virtual('url')
	.get(function(){
		return '/users/patient/' + this._id;
	});

module.exports = mongoose.model('event', eventSchema);
