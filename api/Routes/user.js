const express = require('express')
const userController = require('../Controllers/User')
const authMiddleware = require("../MiddelWare/auth")

const router = express.Router();



router.get("/list", userController.getUsers)
router.get("/", authMiddleware.checkLogin, userController.getUser)
router.patch("/:id/update", authMiddleware.checkLogin, userController.update)
router.delete("/:id/delete", authMiddleware.checkLogin, userController.deleteUser)
router.post("/:id/upload", authMiddleware.checkLogin, userController.uploadImage)
router.get("/cartProducts", authMiddleware.checkLogin, userController.getUserCartProducts)
router.get("/wishlist", authMiddleware.checkLogin, userController.getUserWishList)
router.get("/checkProductInWishList/:productId", authMiddleware.checkLogin, userController.checkProductInWishList)



router.post("/addProduct/:productId", authMiddleware.checkLogin, userController.addProduct)
router.post("/addProductToWishlist/:productId", authMiddleware.checkLogin, userController.addProductToWishlist)

router.delete("/removeProduct/:productId", authMiddleware.checkLogin, userController.removeProduct)
router.delete("/removeProductFromWishlist/:productId", authMiddleware.checkLogin, userController.removeProductFromWishlist)

module.exports = router;
