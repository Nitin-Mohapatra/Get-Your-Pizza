const express = require('express')
const router = express.Router()
const User = require("../models/user")
const { validationResult, body } = require('express-validator');

//creareUser route
router.post("/signup", [
    body("email").isEmail(),
    body("name").isLength({ min: 1 }),
    body("password").isLength({ min: 5 }).withMessage("Password must be more than 5 character").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/).withMessage("password must be alphanumeric")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Error found in validation", errors.array())
       return res.status(400).json({ success: false, errors: errors.array()})
    }
    try 
    {
        {
            const ans = await User.create({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: req.body.password
            })
            if (ans) {
                res.send({ "success": true })
            } else {
                res.send({ "success": false })
            }
        }
    }catch(e){
        res.status(400).json({"success":false,"error":"Error saving the user"})
    }
})

module.exports = router