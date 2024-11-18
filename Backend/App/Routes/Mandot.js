const router = require("express").Router()
const multer = require('multer');
const path = require('path');

const {GetAccessToken,placeOrder,ExitplaceOrder,checkOrder,GetAccessTokenAdmin,brokerLink} = require('../Controllers/Mandot')

router.post('/mandot/getaccesstoken', GetAccessToken);
router.post('/mandot/placeorder', placeOrder);
router.post('/mandot/exitplaceorder', ExitplaceOrder);
router.post('/mandot/checkorder', checkOrder);
router.get('/mandot/getaccesstokenadmin', GetAccessTokenAdmin);
router.post('/mandot/brokerlink', brokerLink);


module.exports = router;
