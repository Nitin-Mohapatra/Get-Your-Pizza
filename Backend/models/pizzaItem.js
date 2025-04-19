const mongoose = require("mongoose")
const {Schema} = mongoose

const pizzaItemSchema = new Schema({
    name : {
        type:String,
        required:true,
        unique:true,
    },
    description : {
        type:String,
        required:true,
    },
    category : {
        type:String,
        required:true,
        enum:['Veg','Non-Veg']
    },
    size : {
        type:[String],
        required:true,
        enum:['Small','Medium','Large']
    },
    ingredients : {
        type:[String],
        required:true,
    },
    imgUrl :{
        type:String,
        required:false
    }
})
const pizzaItem = mongoose.model("PizzaItem",pizzaItemSchema)
module.exports = pizzaItem;