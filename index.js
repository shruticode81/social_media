const express = require('express');
const cookieParse = require('cookie-parser');//require cookie package
const app = express();
const port = 2500;
const expressLayouts = require('express-ejs-layouts');
const db= require('./config/mongoose');
app.use(express.urlencoded());
app.use(cookieParse());//telling app to use it --> middleware
app.use(express.static('./assets'));
app.use(expressLayouts);

//Extract styles and script from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use('/',require('./routes'));
app.set('view engine','ejs');
app.set('views','./views');
// Run the server at port:2500
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server:${err}`);
    }
    console.log(`Server is running on port:${port}`);
});
//run your file
