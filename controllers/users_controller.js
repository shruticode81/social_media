const User = require('../models/users');
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req,res){
    //check if user_id is present in cookies
  //  console.log(`content of ${req.cookies.user_id}`);
   // if(req.cookies.user_id) {
     //  User.findById(req.cookies.user_id,function(err,user){
       //     if(user){
           User.findById(req.params.id , function(err,user){
            return res.render('users',{
                title:"User Profile",
                profile_user:user
            });
           });
                
    //         }
    //         return res.redirect('/users/sign-in');
    //     })
    // }else{
    //     return res.redirect('/users/sign-in');
    // }
    //res.end('<h1> Users Profile Render </h1>');
    // return res.render('users',{
    //     title: "Profile"
    // });
    
}

module.exports.update = async function(req,res){
    // if(req.user.id == req.params.id){
    //     console.log('update',req.body);
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
             
    //         return res.redirect('back');
    //     });
    //     // User.findById(req.params.id,function(err,user){
    //     //     console.log('**/**/',user);
    //     // });
    // }
    // else{
    //     return res.status(401).send('Unauthorized');
    // }
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            //console.log('******',req.file);
            User.uploadedAvatar(req,res,function(err){
                if(err){console.log('***MulterError :',err)}
                //console.log(req.file);
                //now save the updated info inside user schema db
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    //this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' +req.file.filename;
                }
                user.save();
                //console.log('/*/',user);
                return res.redirect('back');
            });
        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }else{
        req.flash('error','Unauthorized!');
        return res.status(401).send('Unauthorized');
    }

}

// tell me the issue
module.exports.posts = function(req,res){
    //res.end('<h1> Displaying posts</h1>');
    return res.render('posts',{
        title:"Posts"
    });
}
//render the sign up page only when the user is signout
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        //if the user is authenticated then it will goes to the profile page
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: 'Codeial | Sign UP'
    });
}
//render the sign in page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title: 'Codeial | Sign In'
    });
}
// get the sign up data
module.exports.create = function(req,res){
    //todo later
    //check for passord
    console.log(req.body.password);
    if(req.body.password!= req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('err in finding user in signing up');
            return;

        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('erroe n creatg user whle sgnng up');
                    return;
                }
                return res.redirect('/users/sign-in');
            });

        }else{
            return res.redirect('back');
        }
    });
    
}
///get the sign in data
module.exports.createSession = function(req,res){
    
    req.flash('success','Logged in Successfully');
    // console.log(req.flash('success'));

    //todo later
    return res.redirect('/'); // as user is already signed in so just redirect

}
module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success','You are Logged out');
    return res.redirect('/');

    //Steps to authenticate
    //find the user in db
    // User.findOne({email:req.body.email},function(err,user){
    //     if(err){
    //         console.log('error in finding user in signing up');
    //         return;
    //     }
    //     console.log(user);
    //     //handle user foundwant to revert
    //     if(user){
    //         //handle password which does not match
    //         if(user.password != req.body.password){
    //             return res.redirect('back');
    //         }
    //         //handle session creatation
    //         res.cookie('user_id',user.id);
    //         return res.redirect('/users/profile');
    //     }else{
    //         return res.redirect('back');
    //     }
    // });

// >>>>>>> f6fad511c7192d5d04c3aa74ef97ce5bb123d48e
}


