const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const {login, singUp} = require('../controllers/authController');

router.post('/singUp', singUp);
router.post('/login', login);

module.exports = router;
