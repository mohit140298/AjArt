const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const userRoutes = require("./api/Routes/user");
const authRoutes = require("./api/Routes/auth");
const productRoutes = require("./api/Routes/product");
const  cookieParser = require('cookie-parser')



const app = express();
app.use(cookieParser())

//.env configuration
dotenv.config({ path: '.env' })

//cors for cross origin requests
app.use(cors());

//to use json object in application
app.use(express.json());
app.use(express.urlencoded());

app.use("/auth",authRoutes)
app.use("/user", userRoutes)
app.use("/product", productRoutes)

app.get("/", (req,res) => {
    return res.status(200);
})

require('./db/conn')
const PORT = process.env.PORT || 5000

app.listen(PORT,() => console.log(`Server started running on ${PORT}`))