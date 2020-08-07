import Sequelize from 'sequelize';
import sequelize from '../imports/DB.js';

// Model User
var User = sequelize.define('Users', {
    iduser: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    iddocument: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    telephone: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    image:{
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    token: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
    },
    nickname: {
        type: Sequelize.STRING(255),
        unique: true,
        allowNull: false
    }
},{
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

// export User model for use in other files.
module.exports = User;

