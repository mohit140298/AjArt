const mongoose = require('mongoose')

const userCartProductSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
});

const userCartProduct = mongoose.model("UserCartProduct", userCartProductSchema);


module.exports = userCartProduct