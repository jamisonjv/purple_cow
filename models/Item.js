// ORM model for Item

const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config({path: '../.env'});

console.log(process.env)
// init ORM
const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD, 
	{
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: 'postgres'
	}
);

// define item model
const Item = sequelize.define('Item', {
	id: {
		type: DataTypes.STRING,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, {
	tableName: 'items',
	timestamps: false // no need for timestamps
});

// delete all items from set and replace with new set of items
const replace_all = async (items) => {
	// since multi-part query, establish transaction in case certain element fails; then can rollback
	var transaction = await sequelize.transaction();
	try {

		// delete all
		await Item.destroy({
			truncate: true
		}, {
			transaction: transaction
		});
		
		// bulk create
		const output = await Item.bulkCreate(items, {
			transaction: transaction
		});

		// commit transaction
		await transaction.commit();
		return output;
	} catch (err) {
		await transaction.rollback();
		throw (err);
	}
}

// bind to Item model - static method so won't use prototype
Item.replace_all = replace_all.bind(Item);

// export access to database through Item model
// export access to sequelize instance for testing purposess
module.exports = {
	Item: Item,
	sequelize: sequelize
}