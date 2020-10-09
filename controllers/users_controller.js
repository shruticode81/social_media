module.exports.profile = function(req,res){
    //res.end('<h1> Users Profile Render </h1>');
    return res.render('users',{
        title: "Profile"
    });
}

module.exports.posts = function(req,res){
    //res.end('<h1> Displaying posts</h1>');
    return res.render('posts',{
        title:"Posts"
    });
}

