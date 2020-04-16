const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/usersController.js')


// entry point for /users
userRouter.route('/')
    .all((req, res, next) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      next();
    })
    .get(usersController)
    .post((req, res, next) => {
      res.statusCode = 403;
      res.send('POST method unsupported');
})

// entry point for /single user
userRouter.route('/:id')
    .all((req, res, next) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      next();
    })
    .get((req, res, next) => {
      res.send('respond with a resource');
    })
    .post((req, res, next) => {
      res.statusCode = 403;
      res.send('POST method unsupported');
    })

module.exports = userRouter;
