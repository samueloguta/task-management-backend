const express = require('express');
const router = express.Router();
const { getTasks, createTask } = require('../controllers/taskController');

// ⛔ Removed `protect` for public testing
router.route('/').get(getTasks).post(createTask);

module.exports = router;
