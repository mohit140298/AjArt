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
        const user = await User.findById(req.user_id).populate('role').populate('wishListProducts').populate('cartProducts').populate('myProducts')
        //User.findOne({_id:req.params.id})
        if (!user)
        {
            res.status(400).json({"message":"user not found"})
        }
        const wishlistProductIds = user.wishListProducts.map(product => {
            return product._id
        })
        
        
       
        
        res.status(200).json({
            status: 'success',
            role: user.role,
            wishListProductIds: wishlistProductIds,
            wishListProducts: user.wishListProducts,
            cartProducts: user.cartProducts,
            myProducts: user.myProducts,
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



exports.addProductToCart = async (req, res) => {
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
        user.cartProducts.push(product);
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

exports.removeProductFromCart = async (req, res) => {
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
        let productIndex = user.cartProducts.indexOf(productId);//get  "car" index
        //remove car from the colors array
        user.cartProducts.splice(productIndex, 1);
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




