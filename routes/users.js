const express = require('express');
const passport = require('passport');
const router = express.Router();

const usersController = require('../controllers/users_controller');
// const postsController = require('../controllers/post_controller');
router.get('/profile',passport.checkAuthentication, usersController.profile);
router.get('/posts',usersController.posts); //wait
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);
router.post('/create',usersController.create);
<<<<<<< HEAD
//use  passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},

),usersController.createSession);

router.get('/sign-out', usersController.destroySession);
=======
router.post('/create-session',usersController.createSession);
>>>>>>> f6fad511c7192d5d04c3aa74ef97ce5bb123d48e
module.exports=router;


