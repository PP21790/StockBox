const router = require("express").Router()
const multer = require('multer');
const path = require('path');

const {GetAccessToken,placeOrder} = require('../Controllers/Aliceblue')

router.get('/aliceblue/getaccesstoken', GetAccessToken);
router.post('/aliceblue/placeorder', placeOrder);

module.exports = router;
