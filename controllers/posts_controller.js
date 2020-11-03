const Post = require('../models/post') //acquire the post schema
module.exports.create=function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    },function(err,post){
        if(err){
            console.log('error in creating Post');
            return;
        }
        console.log('****',post);
        return res.redirect('back');

    });
}