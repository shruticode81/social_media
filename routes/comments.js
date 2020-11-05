const express = require('express');
const router = express.Router();
const passpost = require('passport');
const commentsController=require('../controllers/comments_controller');

router.post('/create',passpost.checkAuthentication,commentsController.create);
module.exports=router;