const Post=require('../models/post');
const User = require('../models/users');
module.exports.home = async function(req,res){
    //return res.end('<h1> Express is up in running codeial!</h1>');
    //console.log('*/*',req.cookies);
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
    try{
        let posts = await Post.find({})
        .sort('-createdAt') // sort help in sorting the post showing most recent post at top
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        })
   
     // console.log('//',posts[0].comments[0]);
        let users = await User.find({});

        return res.render('home',{
            title: "Codeial | Home",
            posts:posts,
            all_users: users
        });

    }catch(err){
        console.log('Error', err);
        return;
    }
    

    
}

// module.exports.text = function(req,res){
//     res.end('<p1> i m beautiful</p>');
// }