const express = require('express')
const adminController = require('../Controllers/Admin')
const authMiddleware = require("../MiddelWare/auth")

const router = express.Router();

router.get('/list', authMiddleware.checkLogin, adminController.getAdmins);
router.get('/:id', authMiddleware.checkLogin,adminController.getAdmin);
router.post('/create', authMiddleware.checkLogin, adminController.create);



router.patch('/:id/update', authMiddleware.checkLogin,adminController.update)
router.delete('/:id/delete', authMiddleware.checkLogin,adminController.delete)


module.exports = router;