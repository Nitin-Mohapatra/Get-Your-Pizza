const User = require("../models/user");
const express = require("express");
const userStats = express.Router();
const { authenAdmin } = require("./adminAuth");

userStats.get("/userStats", authenAdmin,async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          userCount: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    return res.status(200).json({ success: true, data: result });
  } catch (e) {
    console.error("Server Error", e);
    return res.status(500).json({ success: false });
  }
});

module.exports = { userStats };
