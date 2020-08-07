import BaseService from './BaseService';
import UserController from '../controllers/UserController';
const path = require('path');

/**
 * Services for app web
 */

class UserService extends BaseService{

    constructor(){
        super();
        this.pathPhotoProfile = "./public/uploads/imagesprofiles/";
        this.userController = new UserController;
    }

    /**
     * Upload photo for user, first validate extension and mimetype of file,
     * change name of file for getStringDate (Check GeneralService),
     * move file to /public/uploads/imagesprofiles,
     * remove file
     */
    async uploadPhoto(req, res){
        try{
            let user = req.payload.data;
            var file = req.files.photo;
            //Validate if extension photo is allowed
            await this.validatorFiles.validatePhoto(file);
            //Name of file photo
            var nameFile = this.generalHelper.getStringDate()+"_photoProfile."+this.fileHelper.getExtensionOfMimeType(file.mimetype);
            //Move file to storage
            file.mv(this.pathPhotoProfile+nameFile);
            //Get user (Update last image)
            user = await this.userController.getUser(user.iduser);
            var oldPhotoPath = user.image;
            //Update photo of user
            this.userController.updatePhoto(user.iduser, nameFile);
            //Delete old photo
            if(this.pathPhotoProfile+oldPhotoPath != null)
                this.fileHelper.removeFile(this.pathPhotoProfile+oldPhotoPath);
                
            return res.status(200).json({"ok":JSON.parse(process.env.success).profile_photo_uploaded});
        }
        catch(err){
            this.logger.error("uploadPhoto@UserService "+ JSON.stringify(err));
            res.status(500).json({err: JSON.parse(process.env.errors).internal_server_error})
        }
    }

    async getUsers(req, res){
        try{
            let users = await this.userController.getUsers();
            res.status(200).json(users);
        }
        catch(err){
            res.status(500).json({err: JSON.parse(process.env.errors).internal_server_error})
        }
    }
}

module.exports = UserService;
