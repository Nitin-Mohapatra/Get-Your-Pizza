const express = require('express');
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const router = express.Router();

const authen = (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.status(401).json({ success: false, message: "Authorization header not found" })
    } else {
        const token = req.headers['authorization'].split(' ')[1]; // Extract token from the Authorization header
        console.log(token)
        if (!token) {
            return res.status(401).json({ success: false, message: "Token not found" })
        } else {
            jwt.verify(token, process.env.session_secret_key, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ success: false, message: "Token is invalid or expired" })
                } else {
                    next();
                }
            })
        }
    }
}

// Middleware to check if the user is logged in
const authRoute = express.Router();
authRoute.get("/me",(req, res) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from the Authorization header
    if (!token) {
        return res.status(401).json({ success: false, message: "Token not found" });
    } else {
        jwt.verify(token, process.env.session_secret_key, (err, decoded) => {
            if (err) {
                return res.status(401).json({ success: false, message: "Token is invalid or expired" });
            } else {
                req.userId = decoded.userId; // Store user ID in request object for later use
                return res.status(200).json({ success: false, message: "Token is valid" });
            }
        });
    }
});
module.exports = {authen, authRoute};