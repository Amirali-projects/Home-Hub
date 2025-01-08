const listing=require("../models/listing.js");
module.exports.index=async(req,res)=>{
    let listings=await listing.find({});
    res.render("listings/index",{listings});
 }

 module.exports.newlisting=async(req,res,next)=>{
  let url=req.file.path;
  let filename=req.file.filename;
  let newlisting=new listing(req.body.listing);
  newlisting.owner=req.user._id;
  newlisting.image={url,filename};
  await newlisting.save();
  req.flash("success","New listing has been created");
  res.redirect("/listings");
}


module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new");
  }

  module.exports.showOne=async (req,res,next)=>{
    let {id}=req.params;
 let alisting=await listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
 if(!alisting){
   req.flash("error","This listing does not exist");
  return res.redirect("/listings");
 }
  res.render("listings/showone",{alisting});
}


module.exports.renderEditForm=async (req, res) => {
     let { id } = req.params;
     let listings = await listing.findById(id);
    
  if(!listing){
    req.flash("error","Listing you request doea not exist");
    res.redirect("/listings");
  }
  let originalImageUrl=listings.image.url;
  originalImageUrl=originalImageUrl.replace("/upload","/upload/w_100,h_100");
  res.render("listings/edit", { listings,originalImageUrl }); // Correct path to the edit.ejs view
 }


 module.exports.updateListing=async (req, res, next) => {
  let { id } = req.params;
 let Listing=await listing.findByIdAndUpdate(id,{...req.body.listing});
 if(typeof req.file !=="undefined"){
 let url=req.file.path;
  let filename=req.file.filename;
Listing.image={url,filename};
await Listing.save();
 }
  req.flash("success"," listing updated");
  res.redirect(`/listings/${id}`);
}

module.exports.deleteListing=async(req,res,next)=>{
  let {id}=req.params;
  //await listing.findByIdAndDelete(id, req.body, { new: true }); // Use req.body directly
  await listing.findByIdAndDelete(id);
  req.flash("success","Listing Deleted");
  res.redirect("/listings");
}