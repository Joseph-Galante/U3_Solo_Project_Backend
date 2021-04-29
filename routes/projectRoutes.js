//=============== SETUP ===============//

// grab controller
const projectController = require('../controllers/projectController');

// express
const express = require('express');
const projectRoutes = express.Router();

//=============== ROUTES ===============//

projectRoutes.post('/', projectController.create);
projectRoutes.get('/', projectController.getAll);
projectRoutes.get('/:id', projectController.getOne);
projectRoutes.put('/:id', projectController.edit);
projectRoutes.post('/:projectId/collaborators/:userId', projectController.addCollaborator);
projectRoutes.delete('/:projectId/collaborators/:userId', projectController.removeCollaborator);
projectRoutes.delete('/:id', projectController.delete);
projectRoutes.post('/:id/tasks', projectController.createTask);
projectRoutes.get('/:id/tasks', projectController.getAllTasks);


module.exports = projectRoutes;