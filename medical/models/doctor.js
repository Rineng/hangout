var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DoctorsSchema = new Schema(
	{
		first_name: {type: String, required: true, max: 100},
		last_name: {type: String, required: true, max: 100},
	}
)

//Vritual for patient's full name
DoctorsSchema
	.virtual('name')
	.get(function(){
		return this.las_name + ', ' + this.first_name;
	});

//Virtual for patient's URL
DoctorsSchema
	.virtual('url')
	.get(function(){
		return '/users/patient/' + this._id;
	});

module.exports = mongoose.model('Doctor', PatientSchema);
