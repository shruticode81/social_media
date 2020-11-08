const express = require('express');
const router = express.Router();
const passpost = require('passport');
const passport = require('../config/passport-local-strategy');
const commentsController=require('../controllers/comments_controller');

router.post('/create',passpost.checkAuthentication,commentsController.create);
router.get('/destroy/:id', passport.checkAuthentication,commentsController.destroy);
module.exports=router;