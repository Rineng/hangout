var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

var userSchema = new Schema({
	username: {type: String, required: true, max: 20},
	//firstName: {type: String, required: true, max: 20},
	//lastName: {type: String, required: true, max: 20},
	email: {type: String, required: true, max: 20},
	password: {type: String, required: true, max: 20},
	//passwordConfirm: {type: String, required: true, max: 20}

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
