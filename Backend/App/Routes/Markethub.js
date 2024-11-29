const router = require("express").Router()
const multer = require('multer');
const path = require('path');

const {GetAccessToken,placeOrder,ExitplaceOrder,checkOrder} = require('../Controllers/Markethub')

router.post('/markethub/getaccesstoken', GetAccessToken);
router.post('/markethub/placeorder', placeOrder);
router.post('/markethub/exitplaceorder', ExitplaceOrder);
router.post('/markethub/checkorder', checkOrder);


module.exports = router;
