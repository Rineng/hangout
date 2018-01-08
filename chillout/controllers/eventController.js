var event = require('../models/event');

var async = require('async');

exports.index = function(req, res) {   
    
    async.parallel({
        event_count: function(callback) {
            event.count(callback);
        },
    }, function(err, results) {
        res.render('../node_modules/jade-bootstrap/layouts/navbar', { title: 'Event Homepage', error: err, data: results });
        //res.render('../views/delete', { title: 'Event Homepage', error: err, data: results });

    });
};

//Display list of all events
exports.event_list = function(req, res){
	res.send('NOT IMPOLEMENTED: event list');
};

//Display detail page for a specific event
exports.event_detail = function(req, res){
	res.send('NOT IMPLEMENTED: event detail: ' + req.params.id);	
};

//Display event create form on GET
exports.event_create_get = function(req, res){
	res.send('NOT IMPLEMENTED: event create GET');
};

//Handle event create on POST
exports.event_create_post = function(req, res){
	res.send('NOT IMPLEMENTED: event create POST');	
};

//Display event delete form on GET
exports.event_delete_get = function(req, res){
	res.send('NOT IMPLEMENTED: event delete GET');	
};

// Handle event delete on POST
exports.event_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: event delete POST');
};

// Display event update form on GET
exports.event_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: event update GET');
};

// Handle event update on POST
exports.event_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: event update POST');
};
