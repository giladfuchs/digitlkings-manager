const Sequelize = require('sequelize');

const sequelize = new Sequelize('instaking', 'admin', 'gilad123', {
  dialect: 'mysql',
  host: 'dbop.cx45mrloouth.us-east-2.rds.amazonaws.com'
});


module.exports = sequelize;
