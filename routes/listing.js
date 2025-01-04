if(process.env.NODE_ENV !="production"){ 
    require('dotenv').config()

} 


// This file is basically for routes of the listings
const express = require("express");
const router = express.Router({mergeParams:true});   // This is for merging the parent and child params

// require for listing.js
const Listing = require("../model/listing.js");


// Require for wrapAsync 
const wrapAsync = require("../utils/wrapAsync.js");   // (..) ko ham parent directory mein jaane k liye likhte hein

// This is for middleware.js
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");


const listingController = require("../controllers/listings.js");

// require for multer file parser
const multer  = require('multer')

const {storage} = require('../cloudConfig.js')
const upload = multer({ storage })

// index and post route
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,
    upload.single("listing[image]"),
    validateListing, // this is for schema validation
    wrapAsync(listingController.addCreateListing))



// for create route
router.get("/new",isLoggedIn,listingController.createListing);

// show show ,update and delete route
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing, // this is for schema validation
    wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));


// for edit route 
router.get("/:id/edit",isLoggedIn,
    isOwner,
    wrapAsync(listingController.editListing));


    
module.exports=router;