const router = require("express").Router()
const multer = require('multer');
const path = require('path');

const {GetAccessToken,placeOrder,ExitplaceOrder,checkOrder,GetAccessTokenAdmin,brokerLink} = require('../Controllers/Markethub')

router.get('/markethub/getaccesstoken', GetAccessToken);
router.post('/markethub/placeorder', placeOrder);
router.post('/markethub/exitplaceorder', ExitplaceOrder);
router.post('/markethub/checkorder', checkOrder);
router.get('/markethub/getaccesstokenadmin', GetAccessTokenAdmin);
router.post('/markethub/brokerlink', brokerLink);


module.exports = router;
