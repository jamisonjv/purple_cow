// api for items endpoint

// items endpoint

// import express router
const router = require('express').Router();

// import database ORM interface for query functionality
const { Item } = require('../models/Item');

// import udfs
// handle response is standard response handler for async req function; see helper_functions
const { handle_response } = require('./helper_functions');

// route GET /items
// fetch single item by id
router.get('/', (req, res) => {
	handle_response(req, res, Item.findByPk(req.query.id));
}); 

// route GET /items
// fetch all items
router.get('/all', (req, res) => {
	handle_response(req, res, Item.findAll());
}); 

// route POST /items
// create new item
router.post('/', (req, res) => {
	handle_response(req, res, Item.create({id: req.query.id, name: req.query.name}));
});

// route POST /items
// create new item
router.post('/multiple', (req, res) => {
	handle_response(req, res, Item.bulkCreate(req.body.payload));
});


// route PUT /items
// modify single item - update name for certain id
router.put('/', (req, res) => {
	handle_response(req, res, Item.update(
		{name: req.query.name},
		{where: 
			{id: req.query.id}
		})
	);
});

// route put /items/all
// drop replace all items
// since multiple objects being uploaded, requires http request has a body
router.put('/all', (req, res) => {
	handle_response(req, res, Item.replace_all(req.body.payload));
});

// route delete /items
// delete single item given id
router.delete('/', (req, res) => {
	handle_response(req, res, Item.destroy({where: {id: req.query.id}}));
});


// route delete /items/all
// delete all items
router.delete('/all', (req, res) => {
	handle_response(req, res, Item.destroy({truncate: true}));
});


module.exports = router;