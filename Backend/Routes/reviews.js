const express = require('express')
const Reviews = require('../models/reviews')
const auth = require('./auth')
const { validationResult, body } = require('express-validator');
const Review = require('../models/reviews');

//to show all reviews
const showReview = express.Router()
showReview.get('/showReview',async (req , res)=>{
    try{
        const allReviews = await Reviews.find({})
        if(allReviews){
            return res.status(200).json({success:true , allReviews})
        }
        return res.status(400).json({success:false,error:"Error in fetching data from database"})
    }catch(e){
        return res.status(500).json({success:false,error:"Server Error"})
    }
})

//to create one review
const createReview = express.Router()
createReview.post('/createReview',auth.authen,[
    body("review").notEmpty().withMessage("Please Write an review"),
    body("user_id").notEmpty().withMessage("User_id is required"),
    body("item_id").notEmpty().withMessage("item_id is required"),
],async (req , res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log("Validation Errors:", errors.array());
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        const {review , user, rating,item_id} = req.body;
        const newReview = await Review.create({
            review,
            user,
            rating,
            item_id
        })

        if(newReview){
            console.log("Review Created")
            return res.status(200).json({success: true});
        }
        return res.status(400).json({ success: false, error: "Error in saving review" });
    }catch(e){
        return res.status(500).json({ success: false, error: "Server Error ! Review cannot be created" });
    }
})

module.exports = {createReview,showReview}