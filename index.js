const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const userRoutes = require("./api/Routes/user");
const authRoutes = require("./api/Routes/auth");


const app = express();

//.env configuration
dotenv.config({ path: '.env' })

//cors for cross origin requests
app.use(cors());

//to use json object in application
app.use(express.json());
app.use(express.urlencoded());

app.use("/auth",authRoutes)
app.use("/user", userRoutes)

require('./db/conn')

const PORT = process.env.PORT || 5000

app.listen(PORT,() => console.log(`Server started running on ${PORT}`))