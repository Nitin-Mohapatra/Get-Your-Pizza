require ('dotenv').config();
const express = require('express')
const connectDb = require('./dbsConnectivity')
const app = express()
const port = 8080
const cors = require('cors')
const { authRoute } = require("./Routes/auth")
const loadFoodData = require("./Routes/loadFoodData")
const path = require('path')

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/uploads',express.static(path.join(__dirname,'public/uploads')))

//requiring auth route
app.use("/api", authRoute)  

//requiring routes
const { signup, login, logout } = require("./Routes/createUser");
const {createReview , showReview} = require("./Routes/reviews")
const {razorpayOrder,signVerify} = require('./Routes/razorpayOrder')

app.use("/api",signup)
app.use("/api",login)
app.use("/api",loadFoodData)
app.use("/api",createReview)
app.use("/api",showReview)
app.use("/api",razorpayOrder)
app.use("/api",signVerify)

//Admin Routes
const { signup: adminSignup, login: adminLogin } = require("./Routes/createAdmin");
const {orderStats} = require("./Routes/OrderStats")
const {userStats} = require("./Routes/userStats")
const{menuItemStats} = require("./Routes/menuItemStats")
const orderData = require("./Routes/OrderData")
const addItem = require("./Routes/adminAddMenu")

app.use('/admin', adminLogin);
app.use('/admin', adminSignup);
app.use('/admin', orderStats);
app.use('/admin', userStats);
app.use('/admin', menuItemStats);
app.use('/admin', orderData);
app.use('/admin', addItem);


//connecting db
connectDb()


app.listen(port, ()=>{
    console.log(`Connected Via port ${port}`)
})