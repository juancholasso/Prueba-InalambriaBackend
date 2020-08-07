import bcrypt from 'bcrypt';
import sequelize from '../imports/DB.js';

/**
 * ExampleController
 */
class BaseController{

    constructor(){
        this.sequelize = sequelize;
        this.bcrypt = bcrypt;
    }
   
}
//Get list with all roles

module.exports = BaseController;
