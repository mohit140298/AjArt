const Product = require('../Models/product')


exports.create = async (req, res) => {
    const { name, price,image } = req.body;

    if (!name || !price || !image) {
        return res.status(422).json({
            message: "please fill all the required fields"
        })
    }

    // if (password != cpassword) {
    //     return res.status(400).json({
    //         message: "confirm password is different than password"
    //     })
    // }
    try {
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(200).json({
                message: "Email Already Exists !! Please Go to Login Page"
            })
        }
        else {
            const user = new User(req.body)
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

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json({
            status: "success",
            results: products.length,
            data: products
        })



    } catch (error) {
        res.status(404).json({
            status: "failed",
            error: error.message
        })
    }

}

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        //Product.findOne({_id:req.params.id})

        res.status(200).json({
            status: 'success',
            data: product
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
        const product = await Product.findByIdAndUpdate(req.params.id, req.body,
            {
                new: true,
                runValidators: true
            })
        //Product.findOne({_id:req.params.id})

        res.status(200).json({
            status: 'success',
            data: product
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
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "success"
        })
    }
    catch (error) {
        res.status(404).json({
            status: 'failed',
            error: error.message
        })
    }


}