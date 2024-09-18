const express = require('express');
const auth = require('../controllers/authController.js');
const checkSellerPermission = require('../checkUserPermission/checkSellerPermission.js');
const SalleController = require('../controllers/saleController.js');

const router = express.Router();

const saleController = new SalleController();

router.post('/create', express.json(), auth, checkSellerPermission, saleController.create);
router.get('/findList', express.urlencoded(), auth, checkSellerPermission, saleController.findList);
router.get('/findPurchaseItems', express.urlencoded(), auth, checkSellerPermission, saleController.findPurchaseItems);
router.get('/findPurchaseByCpf',express.urlencoded(), auth, checkSellerPermission, saleController.findPurchaseByCpf);

module.exports = router;