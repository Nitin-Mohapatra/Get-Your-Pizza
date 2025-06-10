require ('dotenv').config();
const express = require('express')
const connectDb = require('./dbsConnectivity')
const app = express()
const port = 8080
const cors = require('cors')
const { authRoute } = require("./Routes/auth")
const loadFoodData = require("./Routes/loadFoodData")

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//requiring auth route
app.use("/api", authRoute)

//requiring routes
const { signup, login, logout } = require("./Routes/createUser");
const {createReview , showReview} = require("./Routes/reviews")
app.use("/api",signup)
app.use("/api",login)
app.use("/api",loadFoodData)
app.use("/api",createReview)
app.use("/api",showReview)

//connecting db
connectDb()


app.listen(port, ()=>{
    console.log(`Connected Via port ${port}`)
})