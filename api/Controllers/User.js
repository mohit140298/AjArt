const User = require('../Models/user')
const Product = require('../Models/product')


exports.getUsers = async (req, res) => {
    try {
        const users = await User.find()
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

exports.getUser = async (req, res) => {
    try {
        if (!req.user_id)
        {
            res.status(400).json({ "message": "user not permitted" })
            }
        const user = await User.findById(req.user_id).populate('role')
        //User.findOne({_id:req.params.id})
        if (!user)
        {
            res.status(400).json({"message":"user not found"})
        }
        res.status(200).json({
            status: 'success',
            role: user.role,
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
exports.update = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body,
            {
                new: true,
                runValidators: true
            })
        //User.findOne({_id:req.params.id})

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
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
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

exports.uploadImage = async(req, res) => {
    if (req.files === null) {
        return res.status(400).json({ error: "no file uploaded" })
    }
    const file = req.files.file;
    const user = await User.findById(req.params.id)
    if (!user)
    {
        return res.status(400).send('user not found')
    }
    const type = file.name.split('.')[1]
    const name = user.name.split(' ')[0]
    file.mv(`/home/mohit/mohit/AjArt/server/client/public/images/${name}_${user._id}.${type}`, err => {
        if (err) {
            return res.status(500).send(err)
        }

        user.profileImage = `/images/${name}_${user._id}.${type}`
        user.save()

        res.status(200).json({
            status: "success",
            data: {
                fileName: `${ name }_${ user._id }.${ type }`, filePath: `/images/${name}_${user._id}.${type}`
            }

        })
    })
}

exports.getUserCartProducts = async (req, res) => {
    try {
        const user = await User.findById(req.user_id).populate('products')
        if (!user) {
            return res.status(400).send('user not found')
        }
       
        if (user.products.length) {
            res.status(200).json({
                status: "success",
                data: user.products

            })
        }
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
    
}

exports.addProduct = async (req, res) => {
    try {
        const productId = req.params.productId
        const id= req.user_id
        if (!id || !productId) {
            return res.status(400).send('operation failed')
        }
        const user = await User.findById(id)
        const product = await Product.findById(productId)
        if (!user) {
            return res.status(400).send('user not found')
        }
        if (!product)
        {
            return res.status(400).json({"msg":"product not found"})
            }
        user.products.push(product);
        await user.save()

        res.status(200).json({
            status: "success",
            data: user

        })
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
   
    
}

exports.removeProduct = async (req, res) => {
    try {
        const productId = req.params.productId
        const id = req.user_id
        if (!id || !productId) {
            return res.status(400).send('operation failed')
        }
        const user = await User.findById(id)
        const product = await Product.findById(productId)
        if (!user) {
            return res.status(400).send('user not found')
        }
        if (!product) {
            return res.status(400).json({ "msg": "product not found" })
        }
        let productIndex = user.products.indexOf(productId);//get  "car" index
        //remove car from the colors array
        user.products.splice(productIndex, 1);
        await user.save()

        res.status(200).json({
            status: "success",
            data: user

        })
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }


}

exports.getUserWishList = async (req, res) => {
    try {
        const user = await User.findById(req.user_id).populate('wishListProducts')
        if (!user) {
            return res.status(400).send('user not found')
        }

        if (user.wishListProducts.length) {
            res.status(200).json({
                status: "success",
                data: user.wishListProducts

            })
        }
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }

}

exports.addProductToWishlist = async (req, res) => {
    try {
        const productId = req.params.productId
        const id = req.user_id
        if (!id || !productId) {
            return res.status(400).send('operation failed')
        }
        const user = await User.findById(id)
        const product = await Product.findById(productId)
        if (!user) {
            return res.status(400).send('user not found')
        }
        if (!product) {
            return res.status(400).json({ "msg": "product not found" })
        }
        user.wishListProducts.push(product);
        await user.save()

        res.status(200).json({
            status: "success",
            data: user

        })
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }


}

exports.removeProductFromWishlist = async (req, res) => {
    try {
        const productId = req.params.productId
        const id = req.user_id
        if (!id || !productId) {
            return res.status(400).send('operation failed')
        }
        const user = await User.findById(id)
        const product = await Product.findById(productId)
        if (!user) {
            return res.status(400).send('user not found')
        }
        if (!product) {
            return res.status(400).json({ "msg": "product not found" })
        }
        let productIndex = user.wishListProducts.indexOf(productId);//get  "car" index
        //remove car from the colors array
        user.wishListProducts.splice(productIndex, 1);
        await user.save()

        res.status(200).json({
            status: "success",
            data: user

        })
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }


}

exports.checkProductInWishList = async (req, res) => {
    try {
        const productId = req.params.productId
        const id = req.user_id
        if (!id || !productId) {
            return res.status(400).send('operation failed')
        }
        const user = await User.findById(id)
        const product = await Product.findById(productId)
        if (!user) {
            return res.status(404).send('user not found')
        }
        if (!product) {
            return res.status(404).json({ "msg": "product not found" })
        }
        let productIndex = user.wishListProducts.indexOf(productId);//get  "car" index
       
        //remove car from the colors array
        if (productIndex !== -1) {
            res.status(200).json({
                status: "success",
                data: user

            })
        }
        else
         res.status(400).send("not found")
      
    } catch (error) {
        console.log(error)
    }


}


