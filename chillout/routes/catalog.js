var express = require('express');
var router = express.Router();

//Require controller modules
var user_controller = require('../controllers/userController');

/// User Routes ///
router.get('/', user_controller.index);

router.get('/user/create', user_controller.user_create_get);

router.post('/user/create', user_controller.user_create_post);

router.get('/user/:id/delete', user_controller.user_delete_get);

router.get('/user/:id/update', user_controller.user_update_get);

router.post('/user/:id/delete', user_controller.user_delete_post);

router.post('/users', user_controller.user_list);

module.exports = router;