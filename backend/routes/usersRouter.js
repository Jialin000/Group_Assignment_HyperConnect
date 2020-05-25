const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/usersController.js');
const checkAuth = require('../middleware/checkAuth');



// Route for sign up
usersRouter.route('/signup')
    .post(usersController.userSignUp)


// Route for log in
usersRouter.route('/login')
    .post(usersController.userLogIn);

// Route for log out
usersRouter.route('/logout')
    .all(checkAuth)
    .post(usersController.userLogOut);


// Protected route to get favorite parkingBays,
usersRouter.route('/favorites')

    // Use middleware to verify token before proceeding the request
    .all(checkAuth)
    .post(usersController.addFavorites)
    .get(usersController.getFavorites);

usersRouter.route('/favorites/:id')

    // Use middleware to verify token before proceeding the request
    .all(checkAuth)
    .delete(usersController.deleteFavoriteById);



// Route for deleting user, for development use only
usersRouter.route('/:userId')
    .delete(usersController.deleteUserById);



module.exports = usersRouter;
