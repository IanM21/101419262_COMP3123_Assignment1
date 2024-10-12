const express = require('express');
const { check } = require('express-validator');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', [
    check('username', 'Username is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], userController.signup);

router.post('/login', userController.login);

module.exports = router;