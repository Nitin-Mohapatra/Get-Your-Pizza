const pizzaItem = require("../models/pizzaItem")
const express = require("express");
const menuItemStats = express.Router();
const { authenAdmin } = require("./adminAuth"); // Ensure this path is correct

menuItemStats.get('/menuItemStats',authenAdmin ,async (req , res) => {
  try {
    const totalMenuItem = await pizzaItem.countDocuments({});
    const nonVegItemCount = await pizzaItem.countDocuments({ category: "Non-Veg" });
    const cheeseBurstItemCount = await pizzaItem.countDocuments({ category: "Cheese Burst" });
    const vegItemCount = await pizzaItem.countDocuments({ category: "Veg" });

    res.status(200).json({
      success: true,
      totalMenuItem,
      nonVegItemCount,
      cheeseBurstItemCount,
      vegItemCount
    });
  } catch (error) {
    console.error("Menu Stats Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});


module.exports = { menuItemStats };
