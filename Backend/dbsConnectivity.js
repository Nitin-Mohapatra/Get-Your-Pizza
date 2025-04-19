const mongoose = require("mongoose")
const data =  require("./dbsInsertFiles/pizza_items.js")
const categoryData = require("./dbsInsertFiles/category.js")
const pizzaCategory = require("./models/categoryModel.js")
const pizzaItem = require("./models/pizzaItem")
const connectionString = "mongodb+srv://nitinmohapatra26:1730804_26@cluster0.vbiwbij.mongodb.net/getYourPizza?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(connectionString);
const connectDb = () => {
    const db = mongoose.connection
    db.on("error",function(){
        console.log("An database connection error occured")
    })
    db.once("open",async function(){
        console.log("Connected succefully with database")
        //Bulk data insetion 
        const insertPizzas = async ()=>{
            const pizzas = await pizzaItem.create(data)
            console.log("Data Insertion Successfull")
        }
        //Category insert
        const insertCat = async () =>{
            const model = await pizzaCategory.create(categoryData)
            console.log("Category insertation successfull")
        }

        // insertPizzas()
        // insertCat()
    })
}


module.exports = connectDb

