module.exports.home = function(req,res){
    //return res.end('<h1> Express is up in running codeial!</h1>');
    console.log(req.cookies);
    res.cookie('user_id',1);
    return res.render('home',{
        title:"Home"
    });
}

// module.exports.text = function(req,res){
//     res.end('<p1> i m beautiful</p>');
// }