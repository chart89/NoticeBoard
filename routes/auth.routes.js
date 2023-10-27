const express = require('express');
const router = express.Router();

const Auth = require('../controllers/auth.controller');
const authMiddleware = require('../utils/authMiddleware');

router.post('/register', Auth.register);
router.post('/login', Auth.login);
router.delete('/logout', authMiddleware, Auth.logout);

router.get('/user', authMiddleware, Auth.getUser);

module.exports = router;