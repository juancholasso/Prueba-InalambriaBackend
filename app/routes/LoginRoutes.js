import express from 'express';
import AuthenticationService from '../services/AuthenticationService';

const router = express.Router()
const authenticationService = new AuthenticationService

//Login for user - Generate token and save on DB
router.post('/login', (req, res, next)=>{ authenticationService.login(req,res,next) })
//Logout for user - Delete his token on DB
router.get('/api/logout', (req, res)=>{ authenticationService.logout(req,res) })


module.exports = router
