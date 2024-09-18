const express = require('express');
const ProductController = require('../controllers/productController.js');
const auth = require('../controllers/authController.js');
const checkSellerPermission = require('../checkUserPermission/checkSellerPermission.js');

const productController = new ProductController();

const router = express.Router();

router.post('/create',express.json(), auth, checkSellerPermission, productController.create);
router.get('/findList', express.urlencoded(),auth, checkSellerPermission, productController.findList);
router.get('/findByName', express.urlencoded(), auth, checkSellerPermission, productController.findByName);
router.get('/findAddProduct', express.urlencoded(), auth, checkSellerPermission, productController.findAddProduct);
router.get('/findById', express.urlencoded(), auth, checkSellerPermission, productController.findById);
router.put('/update',express.json(), auth, checkSellerPermission, productController.update);
router.delete('/delete', express.json(), auth, checkSellerPermission, productController.delete);

module.exports = router;