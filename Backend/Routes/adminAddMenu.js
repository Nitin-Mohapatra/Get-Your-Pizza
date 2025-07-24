const express = require('express');
const { validationResult, body } = require('express-validator');
const pizzaItem = require('../models/pizzaItem')
const upload = require('../multer')

const addItem = express.Router()
addItem.post('/addItem',upload.single('file'),[
    body("itm_name").notEmpty().withMessage("Item name can not be empty"),
    body("itm_price").notEmpty().withMessage("itm_price is required"),
    body("description").notEmpty().withMessage("description is required"),
    body("categ").notEmpty().withMessage("Category is required").isIn(["Veg", "Non-Veg", "Cheese Burst"]).withMessage("Invalid category selected"),
    body("size").notEmpty().withMessage("Size is required").isIn(["Small","Medium","Large"]).withMessage("Invalid category selected"),
    body("ingd").notEmpty().withMessage("Indg is required")
    // body("file").notEmpty().withMessage("File is required")
    ],
    async (req,res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            console.log("Validation Errors:", errors.array());
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        try{
            const {itm_name,itm_price,description,categ,size,ingd,file} = req.body;

            const isExit = await pizzaItem.findOne({name:itm_name})
            if(isExit){
                console.error("The item exit in db");
                return res.status(400).json({ success: false, error: "Duplicate Item" });
            }
            console.log("File:", req.file);
            const ext = req.file.originalname.split('.').pop();
            const newItem = await pizzaItem.create({
                name:itm_name,
                description:description,
                price:itm_price,
                category:categ,
                size:size,
                ingredients:[ingd],
                image_url:`http://localhost:8080/uploads/${req.file.filename}` // Assuming the file is stored in the uploads directory
            })
            if(newItem){
                return res.status(200).json({ success: true});
            }
        }catch(e){
            console.error("Login Error:", e.message);
            return res.status(500).json({ success: false, error: "Internal Server Error" });
        }    
    })

module.exports = addItem