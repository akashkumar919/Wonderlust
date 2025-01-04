const express = require("express");
const router = express.Router({mergeParams:true});



router.get("/",(req,res)=>{
    res.cookie("greet" , "namaste");
    res.cookie("madeIn" , "India");
    res.send("We send the cookies!");

})

module.exports = router;