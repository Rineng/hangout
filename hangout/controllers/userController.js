var User = require('../models/user');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const bcrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

exports.index = function(req, res){					//change this, this should not be used to get homepage
	User.count({first_name: 'john'}, function(err, count){
		res.render('../testing.pug', {number: count});
	});
};



exports.user_get_profile = function(req, res){
	User.findOne({'email': req.body.email})
		.exec(function(err, found_user){
			res.render('profile', {'userName': req.params.id})
		})
	
};


// Handle User delete on POST
exports.user_login_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User delete POST');
};
