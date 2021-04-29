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
        console.log('match')
        return true;
    }
    // not owner
    else
    {
        console.log('no match')
        return false;
    }
}


module.exports = ProjectUtils;