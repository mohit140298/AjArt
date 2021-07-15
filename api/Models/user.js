const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: Number,
    password: String,
    cpassword: String,
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
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
        let authToken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: authToken });
        await this.save()
        return authToken
    } catch (error) {
        console.log(error)
    }
}
const user = mongoose.model("User", userSchema);

module.exports = user