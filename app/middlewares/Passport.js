import AuthenticationController from '../controllers/AuthenticationController';
import UserController from '../controllers/UserController';
import passport from 'passport';

const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const authenticationController = new AuthenticationController;
const userController = new UserController;

/**
 * LocalStrategy for Authentication
 * Check if user exist and password is correct
 */
passport.use('login',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, 
    async (email, password, done) => {
        try{
            let user = await userController.getUserByEmail(email);
            if (user == null) {
                return done(null, false);
            }
            else if(await authenticationController.checkEmailAndPassword(email, password)){
                return done(null, user);
            }
            return done(null, false);
        }
        catch(err){
            return done(err)
        }
    }
));

/**
 * JWTStrategy guard for routes
 */
passport.use('jwt',new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey   : process.env.SEED
    },
    (jwtPayload, done) => {
        return done(null, true);
    }
));