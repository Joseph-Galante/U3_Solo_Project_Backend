//=============== SETUP ===============//

// grab controller
const taskController = require('../controllers/taskController');

// express
const express = require('express');
const taskRoutes = express.Router();

//=============== ROUTES ===============//

taskRoutes.get('/:id', taskController.get);
taskRoutes.get('/', taskController.getAll);
taskRoutes.post('/:id/assign', taskController.assign);
taskRoutes.put('/:id', taskController.edit);
taskRoutes.delete('/:id', taskController.delete);
taskRoutes.post('/:id/comments', taskController.comment);

module.exports = taskRoutes;