const express = require('express')

const router = express.Router();

const userController = require('../controller/userController')


// create user api
router.post('/register', userController.createUser )

// user log in 

router.post('/login', userController.login)

module.exports =router