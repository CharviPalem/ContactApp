const express = require("express");
const errorHandler = require("./middleware/errorhandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDb();
const app = express();

const Port  = process.env.PORT || 5000;//static server

app.use(express.json());
app.use('/api/contacts',require("./routes/contactRoutes"))
app.use(errorHandler)

app.listen(Port,()=>{
    console.log(`App is running at port ${Port}`);
});