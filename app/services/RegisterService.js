import BaseService from './BaseService';
import UserController from '../controllers/UserController';

const { Validator } = require('node-input-validator');

/**
 * Services for app web
 */
class RegisterService extends BaseService{

    constructor(){
        super();
        this.userController = new UserController;
    }

    /**
     * Create user, first validate fields required for UserModel
     */
    async signUp(req, res){
        try{
            var check = await this.validatorModels.validateUser(req.body);
            if(!check)
                res.status(400).json({"error":validator.errors});

            await this.userController.createUser(req.body.name, req.body.lastname, req.body.password, req.body.iddocument, req.body.email, req.body.telephone, req.body.nickname);
            res.status(200).json({"ok":JSON.parse(process.env.success).user_created});
        }
        catch(err){
            this.logger.error("singUp@RegisterService "+ JSON.stringify(err));
            res.status(500).json({"error":JSON.parse(process.env.errors).internal_server_error});
        }
        
    }
}

module.exports = RegisterService;
