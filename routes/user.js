const express=require("express");
const router=express.Router();
const user=require("../models/user.js");
const wrapasync = require("../utils/wrapasync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController=require("../controllers/user.js");
router.get("/signup",userController.renderSignUpForm);

router.post("/signup",wrapasync(userController.signUp));
               // where saveredirectUrl is used to go to specific page after login 
router.get("/login",userController.renderLoginForm);
// if user authenticate then we will redirect else we will redirect on login page
router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),wrapasync(userController.login));

router.get("/logout",userController.logout)

module.exports=router;
