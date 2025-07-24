const Payments = require('../models/payments')
const express = require('express');
const orderStats = express.Router();
const { authenAdmin } = require("./adminAuth");

orderStats.get("/orderStats", authenAdmin,async (req, res) => {
  try {
    const result = await Payments.aggregate([
      {
        $match: { status: "paid" }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          orderCount: { $sum: 1 },
          sales:{$sum:"$grandTotal"}
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    if (!result) {
      return res.status(400).json({ success: false, message: "No data found" });
    }

    return res.status(200).json({ success: true, data: result });

  } catch (e) {
    console.error("Aggregation error:", e);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
});

module.exports = {orderStats};
