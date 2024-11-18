const router = require("express").Router()
const multer = require('multer');
const path = require('path');

const {GetAccessToken,placeOrder,ExitplaceOrder,checkOrder,brokerLink} = require('../Controllers/Kotakneo')

router.post('/kotakneo/getaccesstoken', GetAccessToken);
router.post('/kotakneo/placeorder', placeOrder);
router.post('/kotakneo/exitplaceorder', ExitplaceOrder);
router.post('/kotakneo/checkorder', checkOrder);


module.exports = router;
