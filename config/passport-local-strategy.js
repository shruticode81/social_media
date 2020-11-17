const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;  //acquire strategy property
const User = require('../models/users');

//authentication using passport  
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback : true
},
    function(req,email,password,done){
        //find a user and establish the identity
        User.findOne({email:email},function(err,user){
            // console.log(`display the user:${user}`);
            console.log(user);
            if(err){
                //console.log('Error in finding user----> Passport');
                req.flash('error', err);
                return done(err);
            }
            if(!user || user.password != password){
                //console.log('Invalid Username/Password');
                req.flash('error','Invalid Username/Password');
                return done(null,false);
            }
            return done(null,user);
        });
    }
));

//Serializing the user to decide which key to be kept in the cookies
passport.serializeUser(function(user,done){
    // console('---',user.id);
    done(null,user.id); //user.id gets stored in req.session.passport.user={id:''}
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in finding user');
            return done(err);
        }
        return done(null,user);
        //console.log(`user info ${req.user}`);
    });
});

//check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    //if the user is signed in,then pass on the request to the next function (controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

//
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        
        //req.user contains the current signed in user from the session cookies & we are just sending this to the locals for views
        // console.log(`user info ${req.user}`);
        res.locals.user=req.user;
    }
    next();
}
module.exports=passport;
