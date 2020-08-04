const express = require('express');
const router = express.Router();
const defaultCtrl = require('../api/default.Ctrl');

router.get('/healthcheck', defaultCtrl.healthcheck);
router.get('/', defaultCtrl.default);

module.exports = router;