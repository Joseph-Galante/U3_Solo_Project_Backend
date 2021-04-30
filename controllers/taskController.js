//=============== SETUP ===============//

// grab models
const models = require('../models');

// controller obj
const taskController = {};

// user auth controller
const UserAuth = require('../middleware/UserAuth');
const ProjectUtils = require('../middleware/ProjectUtils');
const commentRoutes = require('../routes/commentRoutes');


//=============== METHODS ===============//

// get one task
taskController.get = async (req, res) =>
{
    try {
        // grab task
        const task = await models.task.findOne({
            where: {
                id: req.params.id
            },
            include: [
                { model: models.user },
                { model: models.project },
                { model: models.comment }
            ]
        })
        // check if task exists
        if (task)
        {
            // return task
            res.json({ message: 'task found', task });
        }
        // no task found
        else
        {
            // status 404 - could not be found
            res.status(404).json({ error: 'no task found' });
        }
    } catch (error) {
        console.log(error.message);
        // status 400 - bad request
        res.status(400).json({ error: 'could not get task' });
    }
}

// assign user to task
taskController.assign = async (req, res) =>
{
    try {
        // grab task
        const task = await models.task.findOne({
            where: { id: req.params.id },
            include: [ { model: models.user }, { model: models.project } ]
        });
        const project = task.project;
        // grab authorized user from auth middleware
        const user = await UserAuth.authorizeUser(req.headers.authorization);
        // check if user exists and is project member
        if (user && await ProjectUtils.verifyMember(project, user))
        {
            // check for user id in req body to see who should be assigned and user is project owner
            if (req.body.userId && await ProjectUtils.verifyOwner(project, user))
            {
                // get user to assign to task
                const assignUser = await models.user.findOne({ where: { id: req.body.userId}});
                // check that specified user is a project member
                if (await ProjectUtils.verifyMember(project, assignUser))
                {
                    console.log(assignUser)
                    // assign specified user to task
                    await task.setUser(assignUser);
                    // reload task to reflect user id
                    await task.reload();
                    // return task
                    res.json({ message: 'specified user assigned to task', task });
                }
                // user not part of project
                else
                {
                    // status 401 - unauthorized
                    res.status(401).json({ error: 'specified user is not a project member'})
                }
            }
            // no req body or not project owner - assign current user
            else
            {
                // assign user to task
                await task.setUser(user);
                // reload task to reflect user id
                await task.reload();
                // return task
                res.json({ message: 'assigned self to task', task });
            }
            
        }
        // no user or wasn't on project team
        else
        {
            // status 401- unauthorized
            res.status(401).json({ error: 'unauthorized to assign user to task'})
        }

    } catch (error) {
        console.log(error.message);
        // status 400 - bad request
        res.status(400).json({ error: 'could not assign user to task' });
    }
}

// edit task
taskController.edit = async (req, res) =>
{
    try {
        // grab task
        const task = await models.task.findOne({
            where: { id: req.params.id },
            include: [ { model: models.project }]
        });
        // grab project from task
        const project = task.project;
        // grab authorized user from auth middleware
        const user = await UserAuth.authorizeUser(req.headers.authorization);
        // check if user exists and is a project member
        if (user && await ProjectUtils.verifyMember(project, user))
        {
            // update task
            task.update(req.body);
            // return task
            res.json({ message: 'task updated', task });
        }
        // no user or not on project team
        else
        {
            // status 401- unauthorized
            res.status(401).json({ error: 'unauthorized to edit task'})
        }

    } catch (error) {
        // status 400 - bad request
        res.status(400).json({ error: 'could not edit task' });
    }
}

// delete task
taskController.delete = async (req, res) =>
{
    try {
        // grab task
        const task = await models.task.findOne({
            where: { id: req.params.id},
            include: [ { model: models.project }]
        });
        // grab project from task
        const project = task.project;
        // grab authorized user from auth middleware
        const user = await UserAuth.authorizeUser(req.headers.authorization);
        // check if user exists and is a project member
        if (user && await ProjectUtils.verifyMember(project, user))
        {
            // grab all of task's comments
            const comments = await models.task.findAll({ where: { id: task.id}});
            // delete every comment on task, if any exist
            comments ? comments.forEach(comment => { comment.destroy(); }) : null;
            // delete task
            task.destroy();
            // return message
            res.json({ message: 'task deleted successfully' });
        }
        // no user or wasn't a project member
        else
        {
            // status 401- unauthorized
            res.status(401).json({ error: 'unauthorized to delete task'})
        }

    } catch (error) {
        console.log(error.message);
        // status 400 - bad request
        res.status(400).json({ error: 'could not delete task' });
    }
}

// write comment
taskController.comment = async (req, res) =>
{
    try {
        // grab task
        const task = await models.task.findOne({
            where: { id: req.params.id },
            include: [ { model: models.project } ]
        });
        // grab authorized user from auth middleware
        const user = await UserAuth.authorizeUser(req.headers.authorization);
        // check if user exists and is project member
        if (user && await ProjectUtils.verifyMember(task.project, user))
        {
            // create comment
            const comment = await models.comment.create(
            {
                description: req.body.description
            })
            // add comment to user
            await user.addComment(comment);
            // add comment to task
            await task.addComment(comment);
            // reload comment to update owners ids
            await comment.reload();
            // return task
            res.json({ message: 'comment created', comment });
        }
        // no user or not a project member
        else
        {
            // status 401- unauthorized
            res.status(401).json({ error: 'unauthorized to write a comment' })
        }

    } catch (error) {
        console.log(error.message);
        // status 400 - bad request
        res.status(400).json({ error: 'could not write a comment' });
    }
}

module.exports = taskController;