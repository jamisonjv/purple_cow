// ORM model for Item

const { Sequelize, DataTypes} = require('sequelize');
require('dotenv').config();

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

// export access to database through Item model
module.exports = {
	Item: Item
}