const express = require('express')
const connectDb = require('./dbsConnectivity')
const app = express()
const port = 8080

//requiring routes
const signUpRoutes = require("./Routes/createUser")

//connecting db
connectDb()

app.listen(port, ()=>{
    console.log(`Connected Via port ${port}`)
})

app.use(express.json())

app.use("/api",signUpRoutes)
