import mime from 'mime-types';
import fs from 'fs';

/**
 * Returns extension of mimetype
 * @param {*} mimeType 
 */
function getExtensionOfMimeType(mimeType){
    return mime.extension(mimeType);
}

/**
 * Check if exist folder, otherwise create folder
 * @param {*} path 
 */
function checkExistsOrCreateDir(path){
    if (!fs.existsSync(path)){
        fs.mkdirSync(path);
    }
}

/**
 * Remove file with path
 * @param {*} path 
 */
function removeFile(path){
    try{
        fs.unlinkSync(path);
    }
    catch(err){
        console.log(err);
    }
}

module.exports.getExtensionOfMimeType = getExtensionOfMimeType;
module.exports.checkExistsOrCreateDir = checkExistsOrCreateDir;
module.exports.removeFile = removeFile;