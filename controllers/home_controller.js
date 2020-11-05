const Post=require('../models/post');
module.exports.home = function(req,res){
    //return res.end('<h1> Express is up in running codeial!</h1>');
    console.log('*/*',req.cookies);
    //res.cookie('user_id',1);

    // displaying just post content
    // Post.find({},function(err,posts){
    //     if(err){console.log('error in fetching posts from db ');
    //                 return;
    //            }
    //     return res.render('home',{
    //         title:"Codeial | Home",
    //         posts:posts
    //     });
    // });
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,posts){
        console.log('//',posts[0].comments[0]);
        return res.render('home',{
            title: "Codeial | Home",
            posts:posts
        });
    });


    
}

// module.exports.text = function(req,res){
//     res.end('<p1> i m beautiful</p>');
// }