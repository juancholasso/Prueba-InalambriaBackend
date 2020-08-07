import express from 'express';
import RegisterService from '../services/RegisterService';

const router = express.Router()
const registerService = new RegisterService;

//Register user
router.post('/signup', (req, res) => { registerService.signUp(req, res) });

module.exports = router
