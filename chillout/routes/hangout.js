var express = require('express');
var router = express.Router();
var User = require('../models/user');
//Require controller modules
var index_controller = require('../controllers/indexController');
var user_controller = require('../controllers/userController')
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');



router.get('/login', index_controller.get_login);

router.post('/login', index_controller.post_login);

router.get('/index/create', index_controller.index_create_get);

router.post('/index/create', index_controller.index_create_post);

router.get('/index/:id/delete', index_controller.index_delete_get);

router.get('/index/:id/update', index_controller.index_update_get);

router.post('/index/:id/delete', index_controller.index_delete_post);

//router.post('/index', index_controller.index);

module.exports = router;