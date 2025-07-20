const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getTasks, createTask } = require('../controllers/taskController');

router.use(protect);
router.route('/').get(getTasks).post(createTask);

module.exports = router;
