const express = require('express');
const router = express.Router();
const app = express();

const NoticeController = require('../controllers/notices.controller');

// get all notice
router.get('/notice', NoticeController.getAll);

// get notice by id
router.get('/notice/:id', NoticeController.getById);

// post new notice
router.post('/notice', NoticeController.postOne);

// update notice
router.put('/notice/:id', NoticeController.putOne);

// delete notice
router.delete('/notice/:id', NoticeController.deleteOne);

// find notice by title

router.get('/notice/search/:searchPhrase', NoticeController.searchAll);

module.exports = router;