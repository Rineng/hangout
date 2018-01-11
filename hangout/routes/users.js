var express = require('express');
var router = express.Router();
var User = require('../models/user');
//Require controller modules
//var event_controller = require('../controllers/eventController');
var user_controller = require('../controllers/userController')
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// router.get('/delete', function(req, res, next){
//   res.send("Delete worked");
// });


router.get('/create', user_controller.user_create_get);

router.post('/create', user_controller.user_create_post);

module.exports = router;
