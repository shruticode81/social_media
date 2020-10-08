const express = require('express');
const router = express.Router();
const homeController=require('../controllers/home_controller');

router.get('/',homeController.home);

router.use('/users', require('./users'));
//router.use('/posts', require('./posts'));
module.exports = router;

// can we call /users/profile and /users/posts separtately