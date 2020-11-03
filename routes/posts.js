// const express = require('express');
// const router = express.Router();
// const postsController = require('../controllers/post_controller');
// router.get('/post',postsController.post);

// module.exports=router;
const express = require('express');
const router = express.Router();
const passpost = require('passport');
const postsController=require('../controllers/posts_controller');

router.post('/create',passpost.checkAuthentication,postsController.create);
module.exports=router;