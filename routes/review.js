// This file is basically for routes of the reviews

const express = require("express");
const router = express.Router({mergeParams:true});  // This is for merging the parent and child params

// Require for wrapAsync 
const wrapAsync = require("../utils/wrapAsync.js");   // (..) ko ham parent directory mein jaane k liye likhte hein

// middleware require 
const {validateReview,isLoggedIn,isReviewAuthor} = require("../middleware.js");

// controllers require 
const listingController = require("../controllers/reviews.js");

// for posting reviews route
router.post("/",
    isLoggedIn,
    validateReview,
    wrapAsync(listingController.createReview)
);

// for deleting review route 
router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(listingController.destroyReview)
);

module.exports= router;