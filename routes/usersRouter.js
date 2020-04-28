const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/usersController.js');


// entry point for /users
// usersRouter.route('/')
//     .all(usersController.receiveRequest)
//     .get(usersController.getAllUsers)
//     .post(usersController.createAllUsers)
//     .put(usersController.updateAllUsers)
//     .delete(usersController.deleteAllUsers);


// Route for sign up
usersRouter.route('/signup')
    .all(usersController.receiveRequest)
    .post(usersController.userSignUp)


// Route for log in
usersRouter.route('/login')
    .all(usersController.receiveRequest)
    .post(usersController.userLogIn)




// Route to delete user
usersRouter.route('/:userId')
    .all(usersController.receiveRequest)
    .delete(usersController.deleteUserById)



module.exports = usersRouter;
