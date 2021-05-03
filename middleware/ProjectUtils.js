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

// verify users invites - stops floods of invites frome same project
ProjectUtils.verifyInvite = async (project, user) =>
{
    // init to not yet invited
    let match = false;
    // get users invites
    const invites = await user.getInvites();
    // check if user has invite from project already
    invites.forEach(i =>
    {
        console.log(i);
        if (i.dataValues.projectId == project.id)
        {
            // already invited
            match = true;
        }
    })
    return match;
}


module.exports = ProjectUtils;