const express = require('express')
const userController = require('../Controllers/User')

const router = express.Router();



router.get("/list", userController.getUsers)
router.get("/:id", userController.getUser)
router.patch("/:id/update", userController.update)
router.delete("/:id/delete", userController.deleteUser)

module.exports = router;
