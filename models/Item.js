// ORM model for Item

const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const { replace_all } = require('./business_logic')

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
	tableName: 'items'
});

// sync model to database - will create table if doesn't already exist
Item.sync();

// bind to Item model - static method so don't use prototype
Item.replace_all = replace_all.bind(Item);

// export access to database through Item model
// export access to sequelize instance for testing purposess
module.exports = {
	Item: Item,
	sequelize: sequelize
}