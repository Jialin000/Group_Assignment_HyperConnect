const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/usersController.js');


// entry point for /users
usersRouter.route('/')
    .all(usersController.receiveRequest)
    .get(usersController.getAllUsers)
    .post(usersController.createAllUsers)
    .put(usersController.updateAllUsers)
    .delete(usersController.deleteAllUsers);



// entry point for /users/:id
usersRouter.route('/:id')
    .all(usersController.receiveRequest)
    .get(usersController.getUserByID)
    .post(usersController.createUserByID)
    .put(usersController.updateAllUsers)
    .delete(usersController.deleteAllUsers);

module.exports = usersRouter;
