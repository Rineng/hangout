var express = require('express');
var router = express.Router();
//Require controller modules
var eventController = require('../controllers/eventController');
var indexController = require('../controllers/indexController');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var passport = require('passport');
var User = require('../models/user');

router.get('/', function(req, res){
	res.render('homepage');
});

router.get('/jsonTest', function(req, res){
	res.render('homepage');
});

router.get('/logout', indexController.get_logout);


router.get('/event', eventController.get_createForm);

router.post('/event', eventController.post_createForm);

router.get('/login', indexController.get_login);

// router.post('/login', passport.authenticate('login', {
// 	successRedirect: '/hangout',
// 	failureRedirect: '/hangout/login',
// 	failureFlash: true
// }));

router.post('/login', 
	passport.authenticate('login'), 
	function(req, res){
		console.log(req.session.user_id);
		res.render('homepage', {userAuth: true, userName: req.session.userName});
		//res.render('homepage', {userAuth: true, userName: "testing"});

	}
);



router.get('/signup', indexController.get_user_create)

router.post('/signup', passport.authenticate('signup', {
	successRedirect: '/hangout',
	failureRedirect: '/signup',
	failureFlash: true
}));

module.exports = router;