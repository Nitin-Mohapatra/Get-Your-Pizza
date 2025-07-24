const express = require('express');
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const router = express.Router();

const authenAdmin = (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.status(401).json({ success: false, message: "Authorization header not found" })
    } else {
        const token = req.headers['authorization'].split(' ')[1]; // Extract token from the Authorization header
        // console.log(token)
        if (!token) {
            return res.status(401).json({ success: false, message: "Token not found" })
        } else {
            jwt.verify(token, process.env.session_secret_key_ADMIN, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ success: false, message: "Token is invalid or expired" })
                } else {
                    if(decoded.adminId){
                        req.adminId = decoded.adminId
                    }
                    next();
                }
            })
        }
    }
}



module.exports = {authenAdmin};