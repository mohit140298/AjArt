const express = require('express')
const productController = require('../Controllers/Product')
const authMiddleware = require("../MiddelWare/auth")

const router = express.Router();

router.get('/list', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/create', authMiddleware.checkLogin, productController.create);
router.patch('/:id/update', authMiddleware.checkAdmin, productController.update)
router.delete('/:id/delete', authMiddleware.checkAdmin, productController.delete)
router.post("/:productId/upload", authMiddleware.checkAdmin, productController.uploadProductImage)


module.exports = router;