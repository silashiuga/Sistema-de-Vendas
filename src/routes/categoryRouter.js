const express = require('express');
const CategoryController = require('../controllers/categoryController.js');
const auth = require('../controllers/authController.js');
const checkSellerPermission = require('../checkUserPermission/checkSellerPermission.js');

const router = express.Router();

const categoryController = new CategoryController;

router.post('/create',  express.json(), auth, checkSellerPermission, categoryController.create);
router.get('/findByStatus', express.urlencoded(), auth, checkSellerPermission, categoryController.findByStatus);
router.put('/changeState',  express.json(), auth, checkSellerPermission, categoryController.changeState);
router.put('/update', express.json(), auth, checkSellerPermission, categoryController.update);
router.delete('/delete', express.json(), auth, checkSellerPermission, categoryController.delete);

module.exports = router;
