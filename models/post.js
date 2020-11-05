const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //includes the array of ids of the comments in this post Schema itself
    comments: [ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]

},{
    timestamps: true
});
const Post = mongoose.model('Post',postSchema);
module.exports=Post;
//userid same hain dekho comments array mein post me joh comments h usme comment ki hi id h..main aapko dikhata hu
//just type id  heres mai last ka 5digits dekhsmj wait mai call kari