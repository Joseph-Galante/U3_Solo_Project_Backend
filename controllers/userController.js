//=============== SETUP ===============//

// grab models
const models = require('../models');

// user auth
const UserAuth = require('../middleware/UserAuth');

// data encryption
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// controller obj
const userController = {};


//=============== METHODS ===============//

// // get all users
// userController.getAll = async (req, res) =>
// {
//     try {
//         // grab all users
//         const users = await models.user.findAll();
//         // check if users exist
//         if (users)
//         {
//             // return users
//             res.json({ message: 'users found', users });
//         }
//         // no users
//         else
//         {
//             res.status(404).json({ error: 'no users found'})
//         }
//     } catch (error) {
//         res.status(400).json({ error: 'could not get users' });
//     }
// }

// signup
userController.signup = async (req, res) =>
{
    try {
        // hash password
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        // create user
        const user = await models.user.create(
        {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        // encrypt id
        const encryptedId = jwt.sign({ userId: user.id}, process.env.JWT_SECRET);
        // return user with encrypted id
        user.id = encryptedId;
        res.json({ message: 'signup successfull', user: {id: encryptedId, name: user.name, email: user.email} })
    } catch (error) {
        // check if error is from unqiue email validation
        if (error.message === 'Validation error')
        {
            res.json({ error: 'email already taken'});
        }
        // unknown error
        else
        {
            res.json({ error: error.message });
        }
    }
}

// login
userController.login = async (req, res) =>
{
    try {
        // grab user by email
        const user = await models.user.findOne({ where: { email: req.body.email}});
        // check if passwords match
        if (bcrypt.compareSync(req.body.password, user.password))
        {
            // encrypt id
            const encryptedId = jwt.sign({ userId: user.id}, process.env.JWT_SECRET);
            // return user with encrypted id
            user.id = encryptedId;
            res.json({ message: 'login successful', user: {id: encryptedId, name: user.name, email: user.email} })
        }
        // wrong password
        else
        {
            // status 401 - unauthorized
            res.status(401).json({ error: 'incorrect password' })
        }
    } catch (error) {
        // status 400 - bad request
        res.status(400).json({ error: 'login failed' });
    }
}

// get profile
userController.profile = async (req, res) =>
{
    try {
        // grab authorized user
        const user = await UserAuth.authorizeUser(req.headers.authorization);
        // check if user exists
        if (user)
        {
            // encrypt id
            const encryptedId = jwt.sign({ userId: user.id}, process.env.JWT_SECRET);
            // return user with encrypted id
            user.id = encryptedId;
            res.json({ message: 'user profile found', user: {id: encryptedId, name: user.name, email: user.email} })
        }
        // no user
        else
        {
            // status 404 - could not be found
            res.status(404).json({ error: 'no profile found'});
        }
    } catch (error) {
        // status 400 - bad request
        res.status(400).json({ error: 'failed to  load profile'});
    }
}

// update profile
userController.update = async (req, res) =>
{
    try {
        // grab authorized user
        const user = await UserAuth.authorizeUser(req.headers.authorization);
        // check if user exists
        if (user)
        {
            // update user
            user.update(req.body);
            // encrypt id
            const encryptedId = jwt.sign({ userId: user.id}, process.env.JWT_SECRET);
            // return user with encrypted id
            user.id = encryptedId;
            res.json({ message: 'user profile updated', user: {id: encryptedId, name: user.name, email: user.email} })
        }
        // no user
        else
        {
            // status 404 - could not be found
            res.status(404).json({ error: 'no profile found'});
        }
    } catch (error) {
        // status 400 - bad request
        res.status(400).json({ error: 'failed to  update profile'});
    }
}

module.exports = userController;