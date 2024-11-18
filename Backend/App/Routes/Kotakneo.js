const router = require("express").Router()
const multer = require('multer');
const path = require('path');

const {GetAccessToken,placeOrder,ExitplaceOrder,checkOrder,GetAccessTokenAdmin,brokerLink} = require('../Controllers/Kotakneo')

router.get('/kotakneo/getaccesstoken', GetAccessToken);
router.post('/kotakneo/placeorder', placeOrder);
router.post('/kotakneo/exitplaceorder', ExitplaceOrder);
router.post('/kotakneo/checkorder', checkOrder);
router.get('/kotakneo/getaccesstokenadmin', GetAccessTokenAdmin);
router.post('/kotakneo/brokerlink', brokerLink);


module.exports = router;
