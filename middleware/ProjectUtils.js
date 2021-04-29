// grab models
const models = require('../models');

// helper obj
const ProjectUtils = {};

// verify project owner
ProjectUtils.verifyOwner = async (project, user) =>
{
    // get earliest user project to find owner's id
    const userProject = await models.userProject.findAll({
        where: { projectId: project.id },
        order: ['id'],
        limit: 1
    })
    // console.log(userProject[0])
    // check if project is owned by user
    if (userProject[0].userId === user.id)
    {
        return true;
    }
    // not owner
    else
    {
        return false;
    }
}

// verify project team member
ProjectUtils.verifyMember = async (project, user) =>
{
    let match = false;
    // get projects users
    const collaborators = await project.getUsers();
    // check if project includes user
    collaborators.forEach(c =>
    {
        if (c.dataValues.id == user.id)
        {
            match = true;
        }
    })
    // not project member
    return match;
}


module.exports = ProjectUtils;