//wiki.js = Wiki route module

var express = require('express');
var router = express.Router();


//Home page route
router.get('/', function(req, res){
	res.send('Home page');
});



module.exports = router;
