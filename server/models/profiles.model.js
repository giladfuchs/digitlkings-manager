const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const User = sequelize.define('profiles', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  usernameInstagram:{
    type: Sequelize.STRING,
    allowNull: false,
    unique: true, 
    primaryKey: true
  },
  passwordInstagram: Sequelize.STRING,
  phoneInstagram: Sequelize.STRING,
  email: Sequelize.STRING,
  passwordEmail: Sequelize.STRING,
  backupEmail: Sequelize.STRING,
  passwordBackupEmail: Sequelize.STRING,
  facebook: Sequelize.STRING,
  passwordFacebook: Sequelize.STRING,
  storitoEmail: Sequelize.STRING,
  storitoPassword: Sequelize.STRING,
  storitoIsGoogle: Sequelize.BOOLEAN,

});
// console.log(sequelize); -  משתמש אינסטגרם -סיסמאות- אימילל גיובי טלפון אינסטגרם .   פייסבוק שם משתמש סיסמא  
// . סטוריטו משתמש סיסמא  בסטוריטו לכתוב אם זה התחבר עם גימייל.  אימייל -סיסמא+אימייל גיבוי שמחובר כמו הקיוס

module.exports = User;
