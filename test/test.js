// tests

const { Item, sequelize } = require('../Item');

// get tests

test('fetch single item by id', async () => {
	// TODO
});

test('fetch all items', async () => {
	// TODO
});

// post tests

test('create single new item', async () => {
	// TODO
});

test('create multiple new item', async () => {
	// TODO
});

// put tests

test('modify single item - update name for certain id', async () => {
	// TODO
});

test('replace all items', async () => {
	// TODO
});

// delete tests

test('delete single item given id', async () => {
	// TODO
});

test('delete all items', async () => {
	// TODO
});


afterAll(async () => {
    await sequelize.close();
});
