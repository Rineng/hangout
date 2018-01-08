var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	firstName: {type: String, required: true, max: 100},
	lastName: {type: String, required: true, max: 100},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	passwordConfirm: {type: String, required: true}

});

//Vritual for patient's full name
userSchema
	.virtual('name')
	.get(function(){
		return this.last_name + ', ' + this.first_name;
	});

//Virtual for patient's URL
userSchema
	.virtual('url')
	.get(function(){
		return '/users/' + this._id;
	});

module.exports = mongoose.model('user', userSchema);
