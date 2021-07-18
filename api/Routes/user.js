const express = require('express')
const userController = require('../Controllers/User')
const authMiddleware = require("../MiddelWare/auth")

const router = express.Router();



router.get("/list", userController.getUsers)
router.get("/", authMiddleware.checkLogin, userController.getUser)
router.patch("/:id/update", authMiddleware.checkLogin, userController.update)
router.delete("/:id/delete", authMiddleware.checkLogin, userController.deleteUser)
router.post("/:id/upload", authMiddleware.checkLogin, userController.uploadImage )

module.exports = router;
