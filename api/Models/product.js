const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: String,
    price:Number,
    image:String
});

const product = mongoose.model("Product", ProductSchema);

module.exports = product