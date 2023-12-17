var express = require('express');
var router = express.Router();
const mainController = require('../controllers/main-controller');

router.get('/', mainController.home);

router.post('/borrow/:deviceId', mainController.borrow);

router.delete('/return/:deviceId', mainController.return);

router.get('/devices-list', mainController.deviceList);

router.get('/borrowed-devices', mainController.myborrowed);

module.exports = router;