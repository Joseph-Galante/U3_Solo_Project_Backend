// grab controller
const userController = require('../controllers/userController');

// express
const express = require('express');
const app = express();
const userRoutes = express.Router();

// routes
// userRoutes.get('/', userController.getAll);
userRoutes.post('/', userController.signup);
userRoutes.post('/login', userController.login);
userRoutes.get('/verify', userController.verify);
userRoutes.get('/profile', userController.profile);
userRoutes.put('/profile', userController.update);
userRoutes.get('/invites', userController.getInvites);
userRoutes.delete('/invites/:id', userController.replyToInvite);

module.exports = userRoutes;