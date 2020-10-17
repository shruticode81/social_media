const User = require('../models/users');

module.exports.profile = function(req,res){
    //res.end('<h1> Users Profile Render </h1>');
    return res.render('users',{
        title: "Profile"
    });
}
// tell me the issue
module.exports.posts = function(req,res){
    //res.end('<h1> Displaying posts</h1>');
    return res.render('posts',{
        title:"Posts"
    });
}
//render the sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: 'Codeial | Sign UP'
    });
}
//render the sign in page
module.exports.signIn = function(req,res){
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
// link sended join kroo
//are dekh ligi aise hi 
        }else{
            return res.redirect('back');
        }
    });
    
}
///get the sign in data
module.exports.createSession = function(req,res){
    //todo later
}


//call ,me 7027357315 ---> U r not answer the call??