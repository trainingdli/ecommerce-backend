const express = require('express');
const router = express.Router();
const basicAuth = require('../middleware');
const userController = require('../api/users.ctrl');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/sendEmail', userController.sendEmail);
router.post('/updatePassword', userController.updatePassword);

module.exports = router;