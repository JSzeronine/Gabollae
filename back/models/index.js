const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config );
sequelize.query(
    `SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))`,
    { raw: true }
).then(() => {
  console.log('variable is set')
}).catch((err) => {
  console.log('variable is not set')
  console.error(err)
});

db.User = require( "./user" )( sequelize, Sequelize );
db.Post = require( "./post" )( sequelize, Sequelize );
db.Comment = require( "./comment" )( sequelize, Sequelize );
db.Image = require( "./image" )( sequelize, Sequelize );
db.Hashtag = require( "./hashtag" )( sequelize, Sequelize );

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
