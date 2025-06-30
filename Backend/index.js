const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const expenseRoute = require("./routes/expense");

dotenv.config()
const app = express(); 

// Middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/expenses",expenseRoute);

// DB Connection
mongoose.connect(process.env.DB_CONNECTION).then(()=>{
    console.log('DBCONNECTION is successful')
}).catch((err)=>{
    console.log(err)
})

// Optional root route
app.get("/", (req, res) => {
  res.send("MERN Expense Tracker Backend is running ");
});
// server running
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on post ${process.env.PORT}`)
})
