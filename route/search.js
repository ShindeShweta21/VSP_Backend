const express = require("express");
require("../db/conn.js");
const Video = require("../model/video.js");
const router = express.Router();

router.get("/search" ,async (req,res)=>{
    const query = req.query.q;
    try{
        const videos = await Video.find({
            tittle:{
                $regex: query
            },

        }).limit(40);
        res.status(200).json(videos)
    }
    catch(err){
        console.log(err)
        res.status(404).send("Try Again!!")
    }
})
module.exports=router;
