const express = require('express');
const SellerController = require('../controllers/sellerController');
const auth = require('../controllers/authController.js');
const checkAdmPermission = require('../checkUserPermission/checkAdmPermission.js');
const checkSellerPermission = require('../checkUserPermission/checkSellerPermission.js');
const checkPermissionBoth = require('../checkUserPermission/checkPermissionBoth.js');

const sellerController = new SellerController();


const router = express.Router();

router.post('/create', express.json(), auth, checkAdmPermission, sellerController.create);
router.post('/login', express.json(), sellerController.login);
router.get('/findByCPF', express.urlencoded(), auth , checkAdmPermission, sellerController.findByCPF);
router.get('/findAll', express.json(), auth, checkAdmPermission, sellerController.findAll);

router.get('/findById',express.urlencoded(),  auth, checkPermissionBoth, sellerController.findById);

router.put('/update', express.json(), auth, checkPermissionBoth, sellerController.update);

router.delete('/delete', express.json(), auth, checkPermissionBoth, sellerController.delete)

module.exports = router;



