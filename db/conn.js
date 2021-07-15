const mongoose = require("mongoose");

const DB = process.env.DATABASE;

mongoose
    .connect(
        DB,
        { useNewUrlParser: true },
        { useFindAndModify: false },
        { useUnifiedTopology: true }
    )
    .then(() => {
        console.log("DB connected successfully !! ");
    })
    .catch((error) => console.log("db connection failed !!"));