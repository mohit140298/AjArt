const User = require('../Models/user')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const Role = require('../Models/role')


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                message: "Please fill all the required fields"
            })
        }
        const user = await User.findOne({ email })

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)

            if (isMatch) {
                const userTokenData = await user.generateAuthToken();
                res.cookie("auth", userTokenData.access_token)
                res.status(200).json({
                    status: "success",
                    data: user,
                });

            }
            else {
                res.status(400).json({
                    message: "Invalid Credentials !!"
                })
            }

        }
        else {
            res.status(200).json({
                message: "User with following Email does not exist !! Please Signup"
            });

        }
    }
    catch (error) {
        res.status(404).json({
            status: "failed",
            message: error.message
        })
    }
}


exports.register = async (req, res) => {
  
    const { name, email, mobile, password, cpassword } = req.body;

    if (!name || !email || !mobile || !password || !cpassword) {
        return res.status(422).json({
            message: "please fill all the required fields"
        })
    }

    if (password != cpassword) {
        return res.status(400).json({
            message: "confirm password is different than password"
        })
    }
    try {
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(200).json({
                message: "Email Already Exists !! Please Go to Login Page"
            })
        }
        else {
            let userData = req.body;
            const customerRole = await Role.findOne({ index_id: 3 })
            userData = { ...userData, 'role': customerRole._id }
            console.log(userData);
            const user = new User(userData)
            await user.save()
            res.status(201).json({
                status: "success",
                data: user
            })

        }
    }
    catch (err) {
        res.status(400).json({ "error": err.message })
    }


}

exports.logout = async (req, res) => {
    res.clearCookie('auth', { path: '/' })
    res.status(200).send("user logged out")
}