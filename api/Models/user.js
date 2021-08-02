const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const UserToken = require('./userToken')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: Number,
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
    },
    password: String,
    cpassword: String,
    profileImage: {
        type:String
    },
    cartProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }
    ],
    myProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }
    ],
    wishListProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }
    ]
   
});



userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 12)
        this.cpassword = bcrypt.hashSync(this.cpassword, 12)
    }
    next();
})

userSchema.methods.generateAuthToken = async function () {
    try {
        let authToken = await jwt.sign({ _id: this._id }, process.env.SECRET_KEY, { expiresIn: "5d"});
        const userToken = await UserToken.create({
            userId: this._id,
            access_token: authToken,
            refresh_token: authToken
            
        })
        return userToken;
        
    } catch (error) {
        console.log(error)
    }
}
const user = mongoose.model("User", userSchema);

module.exports = user