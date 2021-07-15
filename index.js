const express = require('express')
const app = express();

app.use("/auth",authRoutes)
app.use("/user",userRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT,() => console.log(`Server started running on ${PORT}`))