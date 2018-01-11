var express = require('express');
var router = express.Router();
var User = require('../models/user');
//Require controller modules
var indexController = require('../controllers/indexController');
//var user_controller = require('../controllers/userController')
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var passport = require('passport');


router.get('/login', indexController.get_login);

router.post('/login', passport.authenticate('login', {
	successRedirect: '/home',
	failureRedirect: '/failure',
	failureFlash: true
}));

//router.post('/login', indexController.post_login);


router.get('/register', indexController.get_user_create)

router.post('/register', passport.authenticate('signup', {
	successRedirect: '/home',
	failureRedirect: '/signup',
	failureFlash: true
}));

// router.get('/index/create', indexController.index_create_get);

// router.post('/index/create', indexController.index_create_post);

// router.get('/index/:id/delete', indexController.index_delete_get);

// router.get('/index/:id/update', indexController.index_update_get);

// router.post('/index/:id/delete', indexController.index_delete_post);

//router.post('/index', indexController.index);

module.exports = router;