const mongoose = require('mongoose')
const {Schema} = mongoose
const user = require('./user')
const pizzaItem = require('./pizzaItem')

const reviewSchema = new Schema({
    review:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:user
    },
    rating:{
        type:Number,
        required:true
    },
    item_id:{
        type:Schema.Types.ObjectId,
        ref:pizzaItem
    }
})

const Review = mongoose.model("Review",reviewSchema)
module.exports = Review