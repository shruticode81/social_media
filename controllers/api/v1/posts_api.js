const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index = async function(req,res){
    let posts = await Post.find({})
        .sort('-createdAt') // sort help in sorting the post showing most recent post at top
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        })
    return res.json(200,{
        message:"Lists of posts",
        posts:posts
    })
}

//controller for deleting the post
module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);

        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post: req.params.id});

            // if(req.xhr){
            //     return res.status(200).json({
            //         data:{
            //             post_id : req.params.id
            //         },
            //         message:"Post deleted"
            //     })
            // }
            // req.flash('success','Post and associated comments deleted!');
            // return res.redirect('back');
            return res.json(200,{
                message:"post and associated comments deleted!"
            });
        }else{
            return res.json(401,{
                message:"you can't delete this post!!"
            });
        }
        
    }catch(err){
        // req.flash('error',err);
        // return res.redirect('back');
        return res.json(500,{
            message:"internal server error!"
        });
    }
   
}   
