const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const userTokenSchema = new mongoose.Schema({
    userId: String,
    access_token: String,
    refresh_token: String

});


const userToken = mongoose.model("UserToken", userTokenSchema);

module.exports = userToken