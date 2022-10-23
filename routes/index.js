const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');
console.log('Router loaded!');

router.get('/',homeController.home );

//  if any other routes use router.use('routername', req file);
router.use('/user', require('./user'));
router.use('/post', require('./post'));
router.use('/comment', require('./comment'));
router.use('/api', require('./api'));
module.exports = router;