const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');
// const postsController = require('../controllers/post_controller');
router.get('/profile', usersController.profile);
router.get('/posts',usersController.posts); //wait


module.exports=router;


