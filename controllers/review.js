const Review=require("../models/review.js");
const listing=require("../models/listing");

module.exports.createReview=async(req,res,next)=>{
    let Listing=await listing.findById(req.params.id);
    let newreview=new Review(req.body.review);
      newreview.author=req.user._id;
      console.log(newreview.author);
    Listing.reviews.push(newreview);

    await newreview.save();
    await Listing.save();
    req.flash("success","Review added");
    res.redirect(`/listings/${Listing.id}`);
};

module.exports.deleteReview=async(req,res)=>{
    let {id,reviewid}=req.params;
 await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
 
 await Review.findByIdAndDelete(reviewid);
 req.flash("success","Review deleted");
 res.redirect(`/listings/${id}`);
}