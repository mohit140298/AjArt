const express = require('express')
const adminController = require('../Controllers/Admin')

const router = express.Router();

router.get('/list', adminController.getAdmins);
router.get('/:id', adminController.getAdmin);
router.post('/create', adminController.create);
router.patch('/:id/update', adminController.update)
router.delete('/:id/delete', adminController.delete)


module.exports = router;