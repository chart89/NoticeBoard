const express = require('express');
const router = express.Router();
const app = express();

const UsersController = require('../controllers/users.controller');

// get all notice
router.get('/user', UsersController.getAll);

module.exports = router;