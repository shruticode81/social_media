//creating own middleware to store the flash msg in res
module.exports.setFlash = function(req,res,next){
    res.locals.flash={
        'success': req.flash('success'),
        'error' : req.flash('error')
    }
    console.log(res.locals);
    next();
}