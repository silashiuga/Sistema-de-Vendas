const express = require('express');
const AdministratorController = require('../controllers/administratorController.js');
const auth = require('../controllers/authController.js');
const checkAdmPermission = require('../checkUserPermission/checkAdmPermission.js');

const administratorController = new AdministratorController();

const router = express.Router();
//createTeste
router.post('/create', express.json(), auth, checkAdmPermission, administratorController.create);
router.post('/login', express.json(), administratorController.login);
router.get('/findByCPF', express.urlencoded(), auth, checkAdmPermission, administratorController.findByCPF);
router.get('/findById', express.urlencoded(), auth, checkAdmPermission, administratorController.findById);
router.get('/findAll', express.json(), auth, checkAdmPermission, administratorController.findAll);

router.put('/update', express.json(), auth, checkAdmPermission, administratorController.update);

router.delete('/delete', express.json(), auth, checkAdmPermission, administratorController.delete);

module.exports = router;



module.exports = router;