const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');
console.log('Router loaded!');

router.get('/',homeController.home );
router.get('/home2', homeController.home2);
//  if any other routes use router.use('routername', req file);
router.use('/post', require('./post'));
router.use('/user', require('./user'));
module.exports = router;