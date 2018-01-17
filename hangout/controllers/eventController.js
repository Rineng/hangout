var event = require('../models/events');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.get_createForm = function(req, res){
    res.render('forms/eventForm');
};

exports.post_createForm = [
	body('eventName', 'Enter a name for the Event').isLength({min: 1}).trim(),
	body('address', 'Enter an address for the Event').isLength({min: 1}).trim(),
	body('date', 'Enter a name for the Event').isLength({min: 1}).trim(),
	body('type', 'What type of event is this?').isLength({min: 1}).trim(),
	sanitizeBody('eventName').trim().escape(),
	sanitizeBody('address').trim().escape(),
	sanitizeBody('date').trim().escape(),
	sanitizeBody('type').trim().escape(),
	(req, res, next) => {
		var newEvent = new event({
			name: req.body.eventName,
			typeOfEvent: req.body.type,
			date: req.body.date,
			address: req.body.address
		});
		newEvent.save(function(err){
			if(err)
				return handleError(err);
			else{
				res.redirect('homepage');
			}
		});
	}
];
