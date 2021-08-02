const User = require('../Models/user')
const Role = require('../Models/role')
const Product = require('../Models/product')

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
        const users = await User.find({ role: adminRole })
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
            result: result
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
        const user = await User.findById(req.user_id).populate('myProducts')
        if (!user) {
            return res.status(400).send('permission denied')
        }

        if (user.myProducts.length) {
            res.status(200).json({
                status: "success",
                data: user.myProducts

            })
        }
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }


}

exports.addMyProduct = async (req, res) => {
    try {
        const user = await User.findById(req.user_id).populate('myProducts')
        if (!user) {
            res.status(400).send("permission denied")
        }
        const { name, price } = req.body;

        if (!name || !price) {
            return res.status(422).json({
                message: "please fill all the required fields"
            })
        }

        let productData = req.body;
        const product = new Product(productData)
       
        await product.save()
        user.myProducts.push(product);
        await user.save()
        res.status(201).json({
            status: "success",
            data: product
        })


    } catch (error) {
        console.log(error)
    }
}

exports.uploadProductImage = async (req,res) => {
    try {
        const product = await Product.findById(req.params.productId)
        if (!product)
        {
            return res.status(404).send('product not found')
            }
        if (req.files === null) {
            return res.status(400).json({ error: "no file uploaded" })
        }
        const file = req.files.file;

        const type = file.name.split('.')[1]
        const filename = "product"
        file.mv(`/home/mohit/mohit/AjArt/server/client/public/images/${filename}_${product._id}.${type}`, err => {
            if (err) {
                return res.status(500).send(err)
            }
            product.image = `/images/${filename}_${product._id}.${type}`
            product.save()
            res.status(200).json({
                status: "success",
                data: {
                    fileName: `${filename}_${product._id}.${type}`, filePath: `/images/${filename}_${product._id}.${type}`
                }

            })
        })

        
    } catch (error) {
        console.log(error)
    }
}