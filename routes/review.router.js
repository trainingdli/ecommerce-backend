const express = require('express');
const router = express.Router();
const jwtAuthentication = require('../middleware');
const reviewController = require('../api/reviews.Ctrl');

router.post('/create', jwtAuthentication, reviewController.create);

module.exports = router;