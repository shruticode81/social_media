const express = require('express');
const router = express.Router();
const homeController=require('../controllers/home_controller');
console.log('rourter');
router.get('/',homeController.home);
router.get('/profile',homeController.text);
module.exports = router;