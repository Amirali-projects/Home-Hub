  const listing=require("./models/listing");
  const Review=require("./models/review.js");
  const {listingschema,reviewschema}=require("./schema.js");
  const expressError=require("./utils/expressError.js");
 

  module.exports.isloggedin=((req,res,next)=>{ 
    if(!req.isAuthenticated()){
      req.session.redirectUrl=req.originalUrl;
      // req.session.redirectuser=req.originalU
    req.flash("error","You must be loggedin first to create listing");
    return res.redirect("/login");
  }
  next();
})

//  By user.js when user is suthenticated then it will reset the sessions after login we will will save the value in locals

module.exports.saveRedirectUrl=((req,res,next)=>{
      if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
      }
      next();
})

module.exports.isOwner=(async(req,res,next)=>{
  let {id}=req.params;
  let Listing=await listing.findById(id);
     if(!Listing.owner._id.equals(res.locals.curruser._id)){
      req.flash("error","You do not have permission for this as you are not owner of this listing");
      return res.redirect(`/listings/${id}`);
     }
     next();
})

  //   To include the implementation of joe
  module.exports.validatelisting=((req,res,next)=>{
    let {error}=listingschema.validate(req.body);
if(error){
  throw new expressError(400,error);          // This is made  for server side validation from schema.js
}
else{
  next();
}
})

module.exports.validatereview=((req,res,next)=>{
  let {error}=reviewschema.validate(req.body);
if(error){
throw new expressError(400,error);                               // This is made  for server side validation from schema.js
}
else{
next();
}
})

module.exports.isReviewAuthor=(async(req,res,next)=>{
  let {id,reviewid}=req.params;
  let review=await Review.findById(reviewid);
     if(!review.author._id.equals(res.locals.curruser._id)){
      req.flash("error","You do not have permission for this as you are not owner of this review");
     return  res.redirect(`/listings/${id}`);
     }
     next();
})