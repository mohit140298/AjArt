const Product = require('../Models/product')
const User = require('../Models/user')


exports.create = async (req, res) => {
    
    try {
        const user = await User.findById(req.user_id).populate('myProducts')
        if (!user) {
            return res.status(400).send("permission denied")
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
        const product = await Product.findByIdAndDelete(req.params.id)
        const user = await User.findById(req.user_id).populate('myProducts')
        if (!user) {
            return res.status(400).send("permission denied")
        }
        const productIndex = user.myProducts.indexOf(product._id)
        user.myProducts.splice(productIndex, 1);
        await user.save()
        res.status(200).json({
            status: "success",
            data:user
        })
    }
    catch (error) {
        res.status(404).json({
            status: 'failed',
            error: error.message
        })
    }


}

exports.uploadProductImage = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId)
        if (!product) {
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