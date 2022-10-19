// api for items endpoint

// items endpoint

// import express router
const router = require('express').Router();

// import database ORM interface for query functionality
const { Item } = require('../Item');

// route GET /items
// fetch single item by id
router.get('/', (req, res) => {
	// TODO
}); 

// route GET /items
// fetch all items
router.get('/all', (req, res) => {
	// TODO
}); 

// route POST /items
// create new item
router.post('/', (req, res) => {
	// TODO
}); 

// route POST /items
// create new item
router.post('/multiple', (req, res) => {
	// TODO
}); 

// route PUT /items
// modify single item - update name for certain id
router.put('/', (req, res) => {
	// TODO
}); 

// route put /items/all
// drop replace all items
// since multiple objects being uploaded, requires http request has a body
router.put('/all', (req, res) => {
	// TODO
}); 

// route delete /items
// delete single item given id
router.delete('/', (req, res) => {
	// TODO
}); 

// route delete /items/all
// delete all items
router.delete('/all', (req, res) => {
	// TODO
}); 

module.exports = router;