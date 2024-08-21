const router = require("express").Router()
const {AddCoupon,getCoupon,updateCoupon,deleteCoupon,detailCoupon} = require('../Controllers/Coupon')

router.post('/coupon/add', AddCoupon);
router.get('/coupon/list', getCoupon);
router.put('/coupon/update', updateCoupon);
router.get('/coupon/delete/:id', deleteCoupon);
router.get('/coupon/detail/:id', detailCoupon);


module.exports = router;
