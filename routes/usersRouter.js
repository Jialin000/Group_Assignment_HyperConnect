const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/usersController.js');




// Route for sign up
usersRouter.route('/signup')
    .all(usersController.receiveRequest)
    .post(usersController.userSignUp)


// Route for log in
usersRouter.route('/login')
    .all(usersController.receiveRequest)
    .post(usersController.userLogIn)




// Route for deleting user
usersRouter.route('/:userId')
    .all(usersController.receiveRequest)
    .delete(usersController.deleteUserById)



module.exports = usersRouter;
