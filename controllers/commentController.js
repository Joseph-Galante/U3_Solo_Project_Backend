//=============== SETUP ===============//

// grab models
const models = require('../models');

// controller obj
const commentController = {};

// user auth controller
const UserAuth = require('../middleware/UserAuth');
const ProjectUtils = require('../middleware/ProjectUtils');


//=============== METHODS ===============//

// get one task
commentController.get = async (req, res) =>
{
    try {
        // grab comment with owner
        const comment = await models.comment.findOne({
            where: {
                id: req.params.id
            },
            include: [
                { model: models.user }
            ]
        })
        // check if comment exists
        if (comment)
        {
            // return comment
            res.json({ message: 'comment found', comment });
        }
        // no comment found
        else
        {
            // status 404 - could not be found
            res.status(404).json({ error: 'no comment found' });
        }
    } catch (error) {
        console.log(error.message);
        // status 400 - bad request
        res.status(400).json({ error: 'could not get comment' });
    }
}

// edit comment
commentController.edit = async (req, res) =>
{
    try {
        // grab comment to edit with owner
        const comment = await models.comment.findOne({
            where: { id: req.params.id },
            include: [ { model: models.user } ]
        });
        // grab authorized user from auth middleware
        const user = await UserAuth.authorizeUser(req.headers.authorization);
        // check if user exists and owns comment
        if (user && user.id === comment.user.id)
        {
            // update comment
            comment.update(req.body);
            // return comment
            res.json({ message: 'comment updated', comment });
        }
        // no user or not comment owner
        else
        {
            // status 401- unauthorized
            res.status(401).json({ error: 'unauthorized to edit comment'})
        }

    } catch (error) {
        // status 400 - bad request
        res.status(400).json({ error: 'could not edit comment' });
    }
}

// delete comment
commentController.delete = async (req, res) =>
{
    try {
        // grab comment
        const comment = await models.comment.findOne({
            where: { id: req.params.id},
            include: [ { model: models.user }]
        });
        // grab authorized user from auth middleware
        const user = await UserAuth.authorizeUser(req.headers.authorization);
        // check if user exists and owns comment
        if (user && user.id === comment.user.id)
        {
            // delete comment
            comment.destroy();
            // return message
            res.json({ message: 'comment deleted successfully' });
        }
        // no user or wasn't a project member
        else
        {
            // status 401- unauthorized
            res.status(401).json({ error: 'unauthorized to delete comment'})
        }

    } catch (error) {
        console.log(error.message);
        // status 400 - bad request
        res.status(400).json({ error: 'could not delete comment' });
    }
}

module.exports = commentController;