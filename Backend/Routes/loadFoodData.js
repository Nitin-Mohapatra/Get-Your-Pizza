const express = require('express');
const pizzaItem = require('../models/pizzaItem');
const categort = require('../models/categoryModel')
const router = express.Router();

router.get('/loadFoodData' , async(req, res) => {
    try{
        const pizzaData = await pizzaItem.find({})
        const categoryData = await categort.find({})
        if(pizzaData && categoryData){
            return res.status(200).json({success:true , pizzaData,categoryData})
        }
        res.status(400).json({success:false , message:"No data found"})
    }catch(e){
        console.log("Error in Loading food data", e.message)
        return res.status(500).json({success:false , message:"Internal server error"})
    }
})

module.exports = router;