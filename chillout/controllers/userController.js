var User = require('../models/user');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


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
	body('first_name', 'First Name Required').isLength({min: 1}).trim(),
	body('last_name', 'Last Name Required').isLength({min: 1}).trim(),

	// body('email', 'Email Required').isLength({min: 1}).trim(),
	// body('password', 'Password Required, must be 4 characters or more').isLength({min: 4}).trim(),
	// body('passConfirm', 'Re-enter Password Required').isLength({min: 4}).trim(),
	sanitizeBody('first_name').trim().escape(),
	sanitizeBody('last_name').trim().escape(),
	// sanitizeBody('email').trim().escape(),
	// sanitizeBody('password').trim().escape(),
	// sanitizeBody('passwordConfirm').trim().escape(),

	(req, res, next) => {
		const errors = validationResult(req);
		var user = new User(
			{first_name: req.body.first_name,
			last_name: req.body.last_name
			// email: req.body.email,
			// password: req.body.password,
			// passwordConfirm: req.body.passConfirm
			}
		);
		if(!errors.isEmpty()){
			res.render('user_form', {title: 'Create User', first_name: user.first_name, last_name: user.last_name, errors: errors.array()});
		return;
		}
		
		else{
			User.findOne({'first_name': req.body.first_name, 'last_name': req.body.last_name})
				.exec(function(err, found_user){
					if(err){return next(err); }

					if(found_user){
						res.redirect(found_user.url)
					}
					
					else{
						user.save(function(err){
							if(err){return next(err);}
							//res.redirect(user.url);
						})
					}
				})
		} 
	}
];

//Display User delete form on GET
exports.user_delete_get = function(req, res){
	res.send('NOT IMPLEMENTED: User delete GET');	
};

// Handle User delete on POST
exports.user_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User delete POST');
};

// Display User update form on GET
exports.user_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User update GET');
};

// Handle User update on POST
exports.user_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User update POST');
};
