const mongoose = require("mongoose")
const {Schema} = mongoose

const pizzaItemSchemas = new Schema({
    name : {
        type:String,
        required:true,
        unique:true,
    },
    description : {
        type:String,
        required:true,
    },
    price : {
        type:Number,
        required:true,
    },
    category : {
        type:String,
        required:true,
        enum:['Veg','Non-Veg',"Cheese Burst"]
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
    image_url :{
        type:String,
        required:false
    }
})
const pizzaItem = mongoose.model("PizzaItem",pizzaItemSchemas)
module.exports = pizzaItem;