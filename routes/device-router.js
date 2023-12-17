var express = require('express');
var router = express.Router();
const deviceController = require('../controllers/device-controller');

router.post('/register', deviceController.addDevice);

router.post('/:id/upload', deviceController.addPhoto);

router.get('/:id', deviceController.getOne);

router.put('/:id/update', deviceController.updateDevice);

router.delete('/:id/delete', deviceController.deleteDevice);

module.exports = router;
