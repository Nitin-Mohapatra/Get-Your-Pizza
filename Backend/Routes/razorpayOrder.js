const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const env = require('dotenv').config();
const auth = require('./auth')
const crypto = require("crypto");
const Payment = require('../models/payments')

// Razorpay instance
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// POST /razorpayOrder
const razorpayOrder = express.Router()
razorpayOrder.post('/razorpayOrder', auth.authen,async (req, res) => {
    const { amount } = req.body;

    if (!amount || isNaN(amount)) {
        return res.status(400).json({ success: false, message: 'Invalid amount' });
    }

    try {
        const options = {
            amount: Math.round(amount * 100), // in paise
            currency: 'INR',
            receipt: `receipt_order_${Date.now()}`,
        };

        const order = await instance.orders.create(options);
        return res.status(200).json({ success: true, order_id: order.id });
    } catch (e) {
        console.error('Razorpay Order Error:', e);
        return res.status(500).json({ success: false, message: 'Order creation failed' });
    }
});

//veryfy Singnature
const signVerify = express.Router()
signVerify.post('/signVerify',auth.authen, async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            amount,
            userId,
            cartItems,
            couponApplied,
            couponCode,
            discountAmount,
            grandTotal
        } = req.body;

        // 1. Verify the signature
        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generated_signature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Invalid signature" });
        }

        // 2. Prevent duplicate payments
        const existingPayment = await Payment.findOne({ paymentId: razorpay_payment_id });
        if (existingPayment) {
            return res.status(409).json({ success: false, message: "Payment already exists" });
        }

        // 3. Save payment to DB
        try{
            const newPayment = await Payment.create({
            userId,
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            signature: razorpay_signature,
            amount,
            status: 'paid',
            cartItems,
            couponApplied,
            couponCode,
            discountAmount,
            grandTotal
        });
        console.log("save into db")
    }catch(e){
        console.log("Error: ",e)
        }

        return res.status(200).json({ success: true, message: "Payment verified and saved." });
    } catch (error) {
        console.error("Payment verification error:", error);
        return res.status(500).json({ success: false, message: "Server error during payment verification." });
    }
});


module.exports = {razorpayOrder,signVerify};
