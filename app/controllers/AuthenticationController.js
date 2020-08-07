import BaseController from './BaseController';
import UserController from '../controllers/UserController';

/**
 * AuthenticationController 
 */
class AuthenticationController extends BaseController{

    constructor(){
        super();
        this.userController = new UserController;
    }
  
    /**
     * This method return boolean of match between email and password on DB
     * @param {*} email -> Email user
     * @param {*} password -> Password in plain text (Don't ciphered)
     */
    async checkEmailAndPassword(email, password){
        try{
            let user = await this.userController.getUserByEmail(email);
            if(user){
                if(this.bcrypt.compareSync(password, user.get('password'))){
                    return true;
                }
                return false;
            }
            return false;
        }
        catch(err){
            throw err;
        }
    }
}

//Exports-------------------------------------
module.exports = AuthenticationController;
