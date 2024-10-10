const router = require("express").Router()
const multer = require('multer');
const path = require('path');


const {GetAccessToken,placeOrder,ExitplaceOrder} = require('../Controllers/Angle')

router.get('/angle/getaccesstoken', GetAccessToken);
router.post('/angle/placeorder', placeOrder);
router.post('/angle/exitplaceorder', ExitplaceOrder);


module.exports = router;
