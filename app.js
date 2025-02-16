const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const mongoURL = "mongodb://127.0.0.1:27017/testdatabase";
mongoose.connect(mongoURL)
    .then(() => {
        console.log("Successfully connected to MongoDB.");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

const port =3000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/api',userRoutes);
app.use('/',(req,res)=>{
    res.json({message:"Server is working", status:200})
})
app.use('/health',(req,res)=>{
    res.json({message:"APIs are working fine", status:200})
})
app.listen(port, ()=>{
    console.log("Server is running on port", port);
})