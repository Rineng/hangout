var express = require('express');
var router = express.Router();
var User = require('../models/user');
//Require controller modules
var indexController = require('../controllers/indexController');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var passport = require('passport');


router.get('/login', indexController.get_login);

router.post('/login', passport.authenticate('login', {
	successRedirect: '/home',
	failureRedirect: '/',
	failureFlash: true
}));

router.get('/signup', indexController.get_user_create)

router.post('/signup', passport.authenticate('signup', {
	successRedirect: '/home',
	failureRedirect: '/signup',
	failureFlash: true
}));

module.exports = router;