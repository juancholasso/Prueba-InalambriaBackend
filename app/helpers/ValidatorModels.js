const { Validator } = require('node-input-validator');

/**
 * Validation for create User
 * @param {*} user 
 */
async function validateUser(user){
    const validator = new Validator(user, {
        email: 'required|email',
        password: 'required',
        name : 'required',
        lastname: 'required',
        telephone: 'required|digitsBetween:8,12',
        iddocument: 'required|digitsBetween:8,12',
        nickname: 'required'
        },JSON.parse(process.env.validators)
    );
    return await validator.check();
}


module.exports.validateUser = validateUser;