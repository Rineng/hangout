var User = require('../models/user');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

exports.index = function(req, res){					//change this, this should not be used to get homepage
	User.count({first_name: 'john'}, function(err, count){
		res.render('../testing.pug', {number: count});
	});
};


//Display list of all Users
exports.user_list = function(req, res){
	res.send('NOT IMPLEMENTED: User list');
};

//Display detail page for a specific User
exports.user_detail = function(req, res){
	res.send('NOT IMPLEMENTED: User detail: ' + req.params.id);	
};

//Display User create form on GET
exports.user_create_get = function(req, res){
	res.render('user_form.pug', {title: 'Create User'});
};

//Handle User create on POST
exports.user_create_post = [
	body('first_name', 'First Name Required').isLength({ min: 1}).trim(),
	body('last_name', 'Last Name Req').isLength({ min: 4}).trim(),
	body('email', 'Email Required').isLength({min: 1}).trim(),
	body('password', 'Password Required, must be 4 characters or more').isLength({min: 4}).trim(),
	body('passConfirm', 'Re-enter password').isLength({min: 1}).trim(),
	sanitizeBody('first_name').trim().escape(),
	sanitizeBody('last_name').trim().escape(),
	(req, res, next) => {
		const errors = validationResult(req);
		
		///TEST CODE BELOW THIS, DELETE IT 
		var ourRequest = new XMLHttpRequest();
		ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-1.json');
		////TEST CODE ABOVE THIS LINE
		
		var user = new User({
			firstName: req.body.first_name,
			lastName: req.body.last_name,
			email: req.body.email,
			password: req.body.password,
			passwordConfirm: req.body.passConfirm
		});
		if(!errors.isEmpty()){
			res.render('user_form', {title: 'ERROR'});
		return;
		}
		else{
			User.findOne({'email': req.body.email})
				.exec(function(err, found_user){
					if(err){return next(err); }

					if(found_user){
						res.redirect(found_user.url)
					}
					else{
						if(req.body.password == req.body.passConfirm){
							user.save(function(err){
								if(err){return next(err);}
								res.redirect(user.url);
							})
						}
						else{
							res.render('user_form', {title: 'Passwords Do Not Match'});
						}
					}
				})
		}	
	}
];

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
