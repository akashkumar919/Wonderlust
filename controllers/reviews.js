
const Review = require("../model/review.js")
const Listing = require("../model/listing.js")

module.exports.createReview = async(req,res)=>{

    const listing = await Listing.findById(req.params.id);
    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","Review created successfully!"); // review creation
    res.redirect(`/listings/${listing._id}`);

};

module.exports.destroyReview = async(req,res)=>{
    
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull: {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted successfully!");//review deletion
    res.redirect(`/listings/${id}`);

};