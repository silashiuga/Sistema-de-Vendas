const express = require('express');
const ClientController = require('../controllers/clientController');
const auth = require('../controllers/authController.js');
const checkSellerPermission = require('../checkUserPermission/checkSellerPermission.js');

const clientController = new ClientController();

const router = express.Router();
router.post('/create', express.json() ,auth, checkSellerPermission, clientController.create);
router.get('/findByCPF',express.urlencoded(), auth, checkSellerPermission, clientController.findByCPF);
router.get('/findById',express.urlencoded(), auth, checkSellerPermission, clientController.findById);
router.get('/findAll', auth, checkSellerPermission, clientController.findAll);
router.put('/update', express.json(), auth, checkSellerPermission, clientController.update);
router.delete('/delete', express.json(), auth, checkSellerPermission, clientController.delete)

module.exports = router;



