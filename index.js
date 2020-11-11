const express = require('express');
const cookieParse = require('cookie-parser');//require cookie package
const app = express();
const port = 2500;
const expressLayouts = require('express-ejs-layouts');
const db= require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
//mongo store is used to store the session cookies in the db
const MongoStore = require('connect-mongo')(session);
//acquiring sass middleware
const sassMiddleware = require('node-sass-middleware');
// requiring connect-flash
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(sassMiddleware({        //make use of sass-middleware
    src:'./assets/scss',
    dest:'./assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix:'/css'
}));

app.use(express.urlencoded());
app.use(cookieParse());//telling app to use it --> middleware
app.use(express.static('./assets'));
app.use(expressLayouts);

//Extract styles and script from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//set up views engine
app.set('view engine','ejs');
app.set('views','./views');
//using session-cookie to encrtyt the userid(it's a middleware)

app.use(session({
    name:'codeial',
    //TODO chnge the secret code
    secret: 'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        myAge:(1000*60*100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disable'
        },function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));
app.use(passport.initialize()); //we need to tell app to use pssport
app.use(passport.session()); // helps in maintaining the session. 
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);

app.use('/',require('./routes'));
// Run the server at port:2500
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server:${err}`);
    }
    console.log(`Server is running on port:${port}`);
});

