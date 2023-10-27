const express = require('express');
const router = express.Router();
const app = express();

const NoticeController = require('../controllers/notices.controller');
const authMiddleware = require('../utils/authMiddleware');

// get all notice
router.get('/notice', NoticeController.getAll);

// get notice by id
router.get('/notice/:id', NoticeController.getById);

// post new notice
router.post('/notice', authMiddleware, NoticeController.postOne);

// update notice
router.put('/notice/:id', authMiddleware, NoticeController.putOne);

// delete notice
router.delete('/notice/:id', authMiddleware, NoticeController.deleteOne);

// find notice by title

router.get('/notice/search/:searchPhrase', NoticeController.searchAll);

module.exports = router;