const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
        "ssl": true
    },
    logging: true , //Show all queries Database - Disable on production!
});
  
//Connection Test
sequelize.authenticate()
.then(() => {
    console.log('Connection with DB has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});

module.exports = sequelize;