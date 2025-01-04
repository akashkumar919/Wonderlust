const Listing = require("../model/listing")

// index controller
module.exports.index = async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings})
};

// createListing controller
module.exports.createListing = (req,res)=>{
    res.render("listings/new.ejs")
};

// addCreateListing controller
module.exports.addCreateListing = async (req,res)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id; // jab hm new listing create krte h to owner define krne k liye req.user se owner ki id nikal ke owner mein set kr dege
    newListing.image = {url,filename};
    await newListing.save();
    req.flash("success","New listing created!");
    res.redirect("/listings");  // ham /listings wale index per post ko redirect ke dege 
 
};

// showListing controller
module.exports.showListing = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exist!")
        res.redirect("/listings")
    }
    console.log(listing.owner);
    res.render("listings/show.ejs",{listing});
    
};



//render edit form controller
module.exports.editListing = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist!")
        res.redirect("/listings")
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/h_100,w_150");

    res.render("listings/edit.ejs",{listing,originalImageUrl})
};


// updateListing controller
module.exports.updateListing = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
        await listing.save();
    }

    req.flash("success","listing updated successfully!");
    res.redirect(`/listings/${id}`);
};

// deleteListing controller 
module.exports.destroyListing = async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted successfully!");
    res.redirect("/listings");
    
};