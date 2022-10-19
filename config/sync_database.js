// sync sequelize ORM instance to database - will create table if doesn't already exist
// to be run once on app kickoff

const { sequelize } = require('../models/Item');
sequelize.sync({force: true});

