var index = require('../models/index');

var async = require('async');

exports.get_login = function(req, res) {   
    
    async.parallel({
        index_count: function(callback) {
            index.count(callback);
        },
    }, function(err, results) {
        res.render('../views/login', { title: 'Login Page', error: err, data: results });
    });
};

exports.post_login = [


];

//Display list of all indexs
exports.index_list = function(req, res){
	res.send('NOT IMPOLEMENTED: index list');
};

//Display detail page for a specific index
exports.index_detail = function(req, res){
	res.send('NOT IMPLEMENTED: index detail: ' + req.params.id);	
};

//Display index create form on GET
exports.index_create_get = function(req, res){
	res.send('NOT IMPLEMENTED: index create GET');
};

//Handle index create on POST
exports.index_create_post = function(req, res){
	res.send('NOT IMPLEMENTED: index create POST');	
};

//Display index delete form on GET
exports.index_delete_get = function(req, res){
	res.send('NOT IMPLEMENTED: index delete GET');	
};

// Handle index delete on POST
exports.index_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: index delete POST');
};

// Display index update form on GET
exports.index_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: index update GET');
};

// Handle index update on POST
exports.index_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: index update POST');
};
