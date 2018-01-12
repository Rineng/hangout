var express = require('express');
var router = express.Router();
var User = require('../models/user');
//Require controller modules
//var event_controller = require('../controllers/eventController');
var user_controller = require('../controllers/userController')
//const { body, validationResult } = require('express-validator/check');
//const { sanitizeBody } = require('express-validator/filter');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');



router.get('/profile', function(req, res){
	res.render('profile');
});


module.exports = router;
