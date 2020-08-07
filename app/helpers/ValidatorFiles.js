const { Validator } = require('node-input-validator');

/**
 * Validation for upload photo
 * @param {*} user 
 */
async function validatePhoto(file){
    let isValid = true;
    switch(file.mimetype){
        case 'image/png': break;
        case 'image/jpg': break;
        case 'image/jpeg': break;
        default: throw new Error("Format invalid");
    }
    if(file.size > 10000000)
        throw new Error("Size max");
}


module.exports.validatePhoto = validatePhoto;