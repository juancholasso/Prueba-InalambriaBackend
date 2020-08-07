import AuthenticationService from '../services/AuthenticationService';
import AuthenticationHelper from '../helpers/AuthenticationHelper';
import UserController from '../controllers/UserController';

const userController = new UserController;

/**
 * Decode JWT to user JSON
 */
let decodeToken =  async function (req, res, next){
    try{
        let token = req.headers.authorization;
        req.payload = AuthenticationHelper.decodeJWT(token)
        next();
    }
    catch(err){
        throw err;
    }
};

/**
 * Check if token corresponding to register user on DB
 * This middleware prevents the user from having two more tokens available
 */
let checkToken =  async function (req, res, next){
    try{
        let user = await userController.getUser(req.payload.data.iduser);
        //Validate if user exist
        if(user)
            if(user.token == req.headers.authorization.replace("Bearer ",""))
                next();
            else
                res.status(401).json({"error": JSON.parse(process.env.errors).token_invalid})
        else
            res.status(401).json({"error": JSON.parse(process.env.errors).token_invalid})
    }
    catch(err){
        throw err;
    }
};

/**
 * This middleware protect the folder storage only for user authenticated
 */
let checkTokenByStorageFiles = async function (req, res, next){
    try{
        //Token sent by query params
        let token = req.query.token;
        //Concate Bearer to token
        let userPayload = AuthenticationHelper.decodeJWT("Bearer "+token);
        let user = await userController.getUser(userPayload.data.iduser);
        req.payload = userPayload;
        //Validate if user exist
        if(user)
            if(user.token == token)
                next();
            else
                res.status(401).json({"error": JSON.parse(process.env.errors).token_invalid})
        else
            res.status(401).json({"error": JSON.parse(process.env.errors).token_invalid})
    }
    catch(err){
        res.status(500).json({"error":JSON.parse(process.env.errors).internal_server_error});
    }
}

/**
 * This middleware only allows authenticated user access to his respective folder
 */
let checkUserFolder = async function (req, res, next){
    try{
        let params = req.params;
        if(params.id == req.payload.data.iduser)
            next();
        else
            res.status(401).json({"error": JSON.parse(process.env.errors).token_invalid})
    }
    catch(err){
        res.status(500).json({"error":JSON.parse(process.env.errors).internal_server_error});
    }
}

module.exports.decodeToken = decodeToken;
module.exports.checkToken = checkToken;
module.exports.checkTokenByStorageFiles = checkTokenByStorageFiles;
module.exports.checkUserFolder = checkUserFolder;