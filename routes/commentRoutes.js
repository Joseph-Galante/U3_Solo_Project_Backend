//=============== SETUP ===============//

// grab controller
const commentController = require('../controllers/commentController');

// express
const express = require('express');
const commentRoutes = express.Router();

//=============== ROUTES ===============//

commentRoutes.get('/:id', commentController.get);
commentRoutes.put('/:id', commentController.edit);
commentRoutes.delete('/:id', commentController.delete);

module.exports = commentRoutes;