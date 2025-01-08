require('dotenv').config();

const express=require("express");
const router=express.Router();
const wrapasync= require("../utils/wrapasync.js");
const expressError=require("../utils/expressError.js");
const {listingschema}= require("../schema.js");
const listing=require("../models/listing");
const Home=require("../routes/listing");
const { isloggedin, isOwner,validatelisting } = require("../middleware.js");
const ListingController=require("../controllers/listing.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });

// index route
router.route("/")
.get(wrapasync(ListingController.index))
.post(isloggedin,upload.single('listing[image]'),validatelisting,
wrapasync(ListingController.newlisting));
 

 // Cast Error was occured so I keep it on top.
 // To make a new route
 router.get("/new",isloggedin,(ListingController.renderNewForm));
 
 // Show One post route
 router.get("/:id",wrapasync(ListingController.showOne))
 

 // Edit Route
 router.get("/:id/edit",isloggedin,isOwner, wrapasync(ListingController.renderEditForm));
 
 // Update Route
 router.put("/:id",isloggedin,isOwner,upload.single('listing[image]'),validatelisting, wrapasync(ListingController.updateListing));
 // delete Route
 router.delete("/:id",isloggedin,isOwner,wrapasync(ListingController.deleteListing));



 
module.exports=router;
