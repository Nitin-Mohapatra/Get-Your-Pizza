const express = require('express');
const payment = require("../models/payments")

const orderData = express.Router()

orderData.get("/orderData",async (req,res)=>{
    try{
        const response = await payment.find()
        if(res){
            res.status(200).json({"success":true,data:response})
        }
    }catch(e){
        res.status(500).json({"success":false,error:e})
    }
})

module.exports = orderData