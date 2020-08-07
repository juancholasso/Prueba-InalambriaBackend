import express from 'express';
import UserService from '../services/UserService';

const router = express.Router()
const userService = new UserService;

//Upload image for user
router.post('/uploadphoto', (req, res) => { userService.uploadPhoto(req, res) });
router.post('/', (req, res) => { userService.getUsers(req, res) });

module.exports = router
