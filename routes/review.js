const express=require("express");
const router=express.Router({mergeParams:true});
const wrapasync= require("../utils/wrapasync.js");
const expressError=require("../utils/expressError.js");
const Review=require("../models/review.js");
const listing=require("../models/listing");
const {validatereview, isloggedin, isReviewAuthor}=require("../middleware.js");
const reviewController=require("../controllers/review.js");
// Review post Request
router.post("/",isloggedin,validatereview,wrapasync(reviewController.createReview))

// Delete Review route

router.delete("/:reviewid",isloggedin,isReviewAuthor,validatereview,wrapasync(reviewController.deleteReview)
)

module.exports=router;
