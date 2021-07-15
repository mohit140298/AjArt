const Product = require('../Models/product')


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
exports.deleteProduct = async (req, res) => {
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