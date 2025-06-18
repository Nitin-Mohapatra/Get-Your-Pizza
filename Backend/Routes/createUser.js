const express = require('express');
const router = express.Router();
const User = require("../models/user");
const { validationResult, body } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();

// Create User Route
const signup = express.Router();
signup.post("/signup", [
    body("email").isEmail().withMessage("Email is invalid"),
    body("name").notEmpty().withMessage("Name is required"),
    body("password")
        .isLength({ min: 5 }).withMessage("Password must be more than 5 characters")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/).withMessage("Password must be alphanumeric")
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation Errors:", errors.array());
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const { name, location, email, password } = req.body;

        const isExists = await User.findOne({ email });
        if (isExists) {
            return res.status(400).json({ success: false, error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({
            name,
            location,
            email,
            password: hashedPassword
        });

        if (newUser) {
            console.log("User created:");
            const token = jwt.sign(
                { 
                  userId: newUser._id,
                  isLoggedIn: true,
                },
                process.env.session_secret_key,
                { expiresIn: '1d' }
            );
            return res.status(200).json({ success: true, token,userId: newUser._id });
        } else {
            return res.status(400).json({ success: false, error: "Error saving the user" });
        }
    } catch (e) {
        console.error("Error during signup:", e.message);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});


// Login Route
const login = express.Router();
login.post("/login", [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
        .isLength({ min: 5 }).withMessage("Password must be more than 5 characters")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/).withMessage("Password must be alphanumeric")
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation Errors:", errors.array());
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, error: "User does not exist. Please sign up first." });
        }
        console.log(user._id)
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, error: "Email or Password is incorrect" });
        }

        const token = jwt.sign(
            { 
              userId: user._id,
              isLoggedIn: true,
            },
            process.env.session_secret_key,
            { expiresIn: '1d' }
        );
        console.log("token :" , token)
        return res.status(200).json({ success: true, token ,userId:user._id});

    } catch (e) {
        console.error("Error during login:", e.message);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});


// Logout Route
const logout = express.Router();
logout.get("/logout", (req, res) => {
    res.status(200).json({ success: true, message: "Logging Out" });
});


module.exports = {signup, login, logout};
