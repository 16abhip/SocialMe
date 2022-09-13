const express = require('express');

const router = express.Router();
const userController = require('../controllers/user_controller');

router.get('/profile', userController.profile);
router.get('/profile2', userController.profile2);
module.exports = router;