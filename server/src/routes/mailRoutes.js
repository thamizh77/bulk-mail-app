const express = require('express');
const { getHistory, sendMail } = require('../controllers/mailController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/send', authMiddleware, sendMail);
router.get('/history', authMiddleware, getHistory);

module.exports = router;
