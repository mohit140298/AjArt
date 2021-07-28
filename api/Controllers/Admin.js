const User = require('../Models/user')
const Role = require('../Models/role')


exports.create = async (req, res) => {

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
            const adminRole = await Role.findOne({ index_id: 2 })
            userData = { ...userData, 'role': adminRole }
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

exports.getAdmins = async (req, res) => {
    try {
        const adminRole = await Role.findOne({ index_id: 2 })
        const users = await User.find({role:adminRole})
        res.status(200).json({
            status: "success",
            results: users.length,
            data: users
        })



    } catch (error) {
        res.status(404).json({
            status: "failed",
            error: error.message
        })
    }


}

exports.getAdmin = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        //Product.findOne({_id:req.params.id})

        res.status(200).json({
            status: 'success',
            data: user
        })
    }
    catch (error) {
        res.status(404).json({
            status: 'failed',
            error: error.message
        })
    }
}
exports.update = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body,
            {
                new: true,
                runValidators: true
            })
        //Product.findOne({_id:req.params.id})

        res.status(200).json({
            status: 'success',
            data: user
        })
    } catch (error) {
        res.status(404).json({
            status: 'failed',
            error: error.message
        })
    }

}
exports.delete = async (req, res) => {
    try {
        const result = await User.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "success",
            result:result
        })
    }
    catch (error) {
        res.status(404).json({
            status: 'failed',
            error: error.message
        })
    }


}
exports.getMyProducts = async (req, res) => {
    try {
        const id = req.user_id
        if (!id ) {
            return res.status(400).send('operation failed')
        }
        const user = await User.findById(id)
        res.status(200).json({
            status: "success",
            results: users.length,
            data: users
        })



    } catch (error) {
        res.status(404).json({
            status: "failed",
            error: error.message
        })
    }


}

