const express = require('express')
const productController = require('../Controllers/Product')

const router = express.Router();

router.get('/list', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/create', productController.create);
router.patch('/:id/update', productController.update)
router.delete('/:id/delete', productController.delete)


module.exports = router;