const express = require('express');
const passport = require('passport');
const router = express.Router();

const postApi = require('../../../controllers/api/v1/posts_api');
router.get('/',postApi.index);
router.delete('/:id',passport.authenticate('jwt',{session:false}), postApi.destroy); 
//here session is false bz we don't want to create the session cookies
module.exports = router;