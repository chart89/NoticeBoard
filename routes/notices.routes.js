const express = require('express');
const router = express.Router();

const NoticeController = require('../controllers/notices.controller');
const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUploads');

// get all notice
router.get('/notice', NoticeController.getAll);

// get notice by id
router.get('/notice/:id', NoticeController.getById);

// post new notice
router.post('/notice', imageUpload.single('picture'), authMiddleware, NoticeController.postOne);

// update notice
router.put('/notice/:id', imageUpload.single('picture'), authMiddleware, NoticeController.putOne);

// delete notice
router.delete('/notice/:id', authMiddleware, NoticeController.deleteOne);

// find notice by title

router.get('/notice/search/:searchPhrase', NoticeController.searchAll);

module.exports = router;