const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();   // This is for merging the parent and child params
const User = require("../model/user.js")
const {saveRedirectUrl} = require("../middleware.js")
const passport = require("passport");

const userController = require("../controllers/users.js");

// rnder is for render signup form and signup user 

router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signup));


// This route is for render login form and login user by passport 
router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl, 
    passport.authenticate("local",{failureRedirect:"/login" , failureFlash:true}),
    userController.userLogin
);


// This route for logout the user 
router.get("/logout",userController.userLogout);

module.exports = router;