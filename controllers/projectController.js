//=============== SETUP ===============//

// grab models
const models = require('../models');

// user auth
const UserAuth = require('../middleware/UserAuth');
// project utilities - for verifying project owner
const ProjectUtils = require('../middleware/ProjectUtils');
const projectRoutes = require('../routes/projectRoutes');

// controller obj
const projectController = {};


//=============== METHODS ===============//

// create project
projectController.create = async (req, res) =>
{
    try {
        // grab authorized user from auth middleware
        const user = await UserAuth.authorizeUser(req.headers.authorization);
        // check if user exists
        if (user)
        {
            // create project
            const project = await models.project.create(
            {
                title: req.body.title,
                description: req.body.description,
                dueDate: req.body.dueDate
            })
            // add project to user
            await user.addProject(project);
            // reload project to update user id
            await project.reload();
            // return project
            res.json({ message: 'project created', project });
        }
        // no user
        else
        {
            // status 401- unauthorized
            res.status(401).json({ error: 'unauthorized to make a project'})
        }

    } catch (error) {
        // status 400 - bad request
        res.status(400).json({ error: 'could not create project' });
    }
}

// get all projects
projectController.getAll = async (req, res) =>
{
    try {
        // grab all projects
        const projects = await models.project.findAll();
        // check if projects exist
        if (projects)
        {
            // return all projects
            res.json({ message: 'projects found', projects });
        }
        // no projects
        else
        {
            // status 404 - could not be found
            res.status(404).json({ error: 'no projects found' })
        }
    } catch (error) {
        // status 400 - bad request
        res.status(400).json({ error: 'could not get projects' });
    }
}

// get single project
projectController.getOne = async (req, res) =>
{
    try {
        // grab project with user and answers
        const project = await models.project.findOne({
            where:
            { 
                id: req.params.id
            },
            include:[
                {
                    model: models.user
                },
                {
                    model: models.task,
                    include: [
                        {
                            model: models.user
                        }
                    ]
                }
            ]
        });
        // check if project exists
        if (project)
        {
            // return project with user and answers
            res.json({ message: 'project found', project });
        }
        // no project
        else
        {
            // status 404 - could not be found
            res.status(404).json({ error: 'no project found' })
        }
    } catch (error) {
        console.log(error.message)
        // status 400 - bad request
        res.status(400).json({ error: 'could not get project' });
    }
}

// edit project
projectController.edit = async (req, res) =>
{
    try {
        // grab project
        const project = await models.project.findOne({ where: { id: req.params.id }});
        // grab authorized user from auth middleware
        const user = await UserAuth.authorizeUser(req.headers.authorization);
        // check if user exists and owns project
        if (user && await ProjectUtils.verifyOwner(project, user))
        {
            // update project
            project.update(req.body);
            // return project
            res.json({ message: 'project updated',project });
        }
        // no user or didn't own project
        else
        {
            // status 401- unauthorized
            res.status(401).json({ error: 'unauthorized to edit project'})
        }

    } catch (error) {
        // status 400 - bad request
        res.status(400).json({ error: 'could not edit project' });
    }
}

// add user to project
projectController.addCollaborator = async (req ,res) =>
{
    try {
        // grab project with users
        const project = await models.project.findOne({ 
            where: { id: req.params.projectId },
            include: [ { model: models.user } ]
        });
        // grab authorized user from auth middleware
        const user = await UserAuth.authorizeUser(req.headers.authorization);
        // check if user exists and owns project
        if (user && await ProjectUtils.verifyOwner(project, user))
        {
            // grab user to add
            const collaborator = await models.user.findOne({ where: { id: req.params.userId}});
            // add user as collaborator
            await project.addUser(collaborator);
            // reload project to reflect users
            await project.reload();
            // return project
            res.json({ message: 'collaborator added', project });
        }
        // no user or didn't own project
        else
        {
            // status 401- unauthorized
            res.status(401).json({ error: 'unauthorized to add collaborator'})
        }

    } catch (error) {
        // status 400 - bad request
        res.status(400).json({ error: 'could not add collaborator' });
    }
}

// remove user from project
projectController.removeCollaborator = async (req ,res) =>
{
    try {
        // grab project with users
        const project = await models.project.findOne({ 
            where: { id: req.params.projectId },
            include: [ { model: models.user } ]
        });
        // grab authorized user from auth middleware
        const user = await UserAuth.authorizeUser(req.headers.authorization);
        // check if user exists and owns project
        if (user && await ProjectUtils.verifyOwner(project, user))
        {
            // grab user to remove
            const collaborator = await models.user.findOne({ where: { id: req.params.userId}});
            // remove user as collaborator
            await project.removeUser(collaborator);
            // reload project to reflect users
            await project.reload();
            // return project
            res.json({ message: 'collaborator removed', project });
        }
        // no user or didn't own project
        else
        {
            // status 401- unauthorized
            res.status(401).json({ error: 'unauthorized to remove collaborator'})
        }

    } catch (error) {
        // status 400 - bad request
        res.status(400).json({ error: 'could not remove collaborator' });
    }
}

// get project's tasks
projectController.getAllTasks = async (req, res) =>
{
    try {
        // grab project
        const project = await models.project.findOne({ where: { id: req.params.id}});
        // check if project exist
        if (project)
        {
            // get tasks
            const tasks = await project.getTasks({
                include: [
                    {
                        model: models.user
                    },
                    {
                        model: models.project
                    }
                ]
            });
            // return project's tasks
            res.json({ message: 'project tasks found', tasks });
        }
        // no project
        else
        {
            // status 404 - could not be found
            res.status(404).json({ error: 'no project found' })
        }
    } catch (error) {
        // status 400 - bad request
        res.status(400).json({ error: 'could not get project tasks' });
    }
}

// create task for project
projectController.createTask = async (req, res) =>
{
    try {
        // grab authorized user from auth middleware
        const user = await UserAuth.authorizeUser(req.headers.authorization);
        // check if user exists
        if (user)
        {
            // create task
            const task = await models.task.create(
            {
                description: req.body.description,
                dueDate: req.body.dueDate,
                completed: false
            })
            // grab project
            const project = await models.project.findOne({ where: { id: req.params.id}});
            // add task to project
            await project.addTask(task);
            // reload task to update owners ids
            await task.reload();
            // return task
            res.json({ message: 'task created', task });
        }
        // no user
        else
        {
            // status 401- unauthorized
            res.status(401).json({ error: 'unauthorized to add a task'})
        }

    } catch (error) {
        // status 400 - bad request
        res.status(400).json({ error: 'could not add task' });
    }
}

// delete project
projectController.delete = async (req, res) =>
{
    try {
        // grab authorized user from auth middleware
        const user = await UserAuth.authorizeUser(req.headers.authorization);
        // grab project
        const project = await models.project.findOne({ where: { id: req.params.id}});
        // check if user exists and owns project
        if (user && user.id === project.userId)
        {
            // grab all of project's tasks
            const tasks = await models.task.findAll({ where: { postId: project.id}});
            // delete every task on project, if any exist
            tasks ? tasks.forEach(task => { task.destroy(); }) : null;
            // delete project
            project.destroy();
            // return message
            res.json({ message: 'project deleted successfully' });
        }
        // no user or didn't own project
        else
        {
            // status 401- unauthorized
            res.status(401).json({ error: 'unauthorized to delete project'})
        }

    } catch (error) {
        // status 400 - bad request
        res.status(400).json({ error: 'could not delete project' });
    }
}

module.exports = projectController;