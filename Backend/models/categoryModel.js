const mongoose = require('mongoose')
const {Schema} = mongoose

const catSchema = new Schema({
    CategoryName:{
        type:String,
    }
})
const pizzaCategory = mongoose.model("PizzaCategory",catSchema)
module.exports = pizzaCategory