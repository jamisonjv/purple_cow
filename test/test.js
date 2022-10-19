// tests

const { Item, sequelize } = require('../models/Item');

// sync model to database - will create table if doesn't already exist, else do nothing
beforeAll(async () => {
    await sequelize.sync({});
});

// post tests

test('create single new item', async () => {
	expect.assertions(2);
	const outp = await Item.create({id: 'id_a', name: 'a'});
	expect(outp.id).toEqual('id_a');
	expect(outp.name).toEqual('a');
});


test('create multiple new items', async () => {
	expect.assertions(1);
	await Item.bulkCreate([
		{id: 'id_b', name: 'b'},
		{id: 'id_c', name: 'c'},
	]);
	const outp = await Item.findAll();
	expect(outp.length).toEqual(3);
});

// get tests

test('fetch single item by id', async () => {
	expect.assertions(1);
	const outp = await Item.findByPk('id_a');
	expect(outp.name).toEqual('a');
});


// put tests

test('modify single item - update name for certain id', async () => {
	expect.assertions(1);
	await Item.update(
		{name: 'altname_a'},
		{where: 
			{id: 'id_a'}
		}
	);
	const outp = await Item.findByPk('id_a');
	expect(outp.name).toEqual('altname_a');
});

test('replace all items', async () => {
	expect.assertions(2);
	const tmp = await Item.replace_all([{id: 'id_e', name: 'e'}]); // this one is user-defined function
	console.log(tmp)
	const outp = await Item.findAll();
	expect(outp.length).toEqual(1);
	expect(outp[0].id).toEqual('id_e');
});

// delete tests

test('delete single item given id', async () => {
	expect.assertions(1);
	await Item.destroy({where: {id: 'id_e'}});
	const outp = await Item.findByPk('id_e');
	expect(outp).toBeNull();
});

// close sequelize instance
afterAll(async () => {
    await sequelize.close();
});
