const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/users');

let opts={
    jwtFromRequest :ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey :'codeial'
}
passport.use(new JWTStrategy(opts,function(jwtPayLoad,done){
    User.findById(jwtPayLoad._id,function(err,user){
        if(err){console.log('Error in finding user from jwt');return;}
        if(user){
            return done(null,user); //returns the user
        }else{
            return done(null,false); //user not found
        }
    });
}))
// {
//     _id: user._id
// }