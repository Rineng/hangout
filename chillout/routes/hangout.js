var express = require('express');
var router = express.Router();
var User = require('../models/user');
//Require controller modules
var event_controller = require('../controllers/eventController');
var user_controller = require('../controllers/userController')
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
/// event Routes ///
router.get('/', event_controller.index);

router.get('/user', user_controller.index);

router.get('/user/create', user_controller.user_create_get);

//router.post('/user/create', user_controller.user_create_post);

router.post('/user/create', (req, res, next) => {
	body('first_name', 'First Name Required').isLength({ min: 1}).trim(),
	body('last_name', 'Last Name Req').isLength({ min: 4}).trim();
	body('email', 'Email Required').isLength({min: 1}).trim();
	body('password', 'Password Required, must be 4 characters or more').isLength({min: 4}).trim();
	body('passConfirm', 'Re-enter password').isLength({min: 1}).trim();
	sanitizeBody('first_name').trim().escape();
	sanitizeBody('last_name').trim().escape();
	const errors = validationResult(req);
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
	
});

router.get('/event/create', event_controller.event_create_get);

router.post('/event/create', event_controller.event_create_post);

router.get('/event/:id/delete', event_controller.event_delete_get);

router.get('/event/:id/update', event_controller.event_update_get);

router.post('/event/:id/delete', event_controller.event_delete_post);

router.post('/events', event_controller.event_list);

module.exports = router;