import Sequelize from 'sequelize';
import dbConfig from '../config/db.config';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.DIALECT,
	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		idle: dbConfig.pool.idle,
	},
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.tutorials = require('./tutorial.model.js')(sequelize, Sequelize);

export default db;
