const router = require("express").Router()
const multer = require('multer');
const path = require('path');

const { checkPermission } = require('../Middleware/permissionMiddleware');

const {AddCoupon,getCoupon,updateCoupon,deleteCoupon,detailCoupon,statusChange,activeCoupon} = require('../Controllers/Coupon')


const PERMISSIONS = {
    ADD: 'addcoupon',
    VIEW: 'viewcoupon',
    ALL_VIEW: 'allviewcoupon',
    UPDATE: 'editcoupon',
    DELETE: 'deletecoupon',
    CHANGE_STATUS: 'couponchangestatus',
  };

router.post('/coupon/add', checkPermission(PERMISSIONS.ADD), AddCoupon);
router.get('/coupon/list', checkPermission(PERMISSIONS.ALL_VIEW), getCoupon);
router.put('/coupon/update', checkPermission(PERMISSIONS.UPDATE), updateCoupon);
router.get('/coupon/delete/:id', checkPermission(PERMISSIONS.DELETE), deleteCoupon);
router.get('/coupon/detail/:id', checkPermission(PERMISSIONS.VIEW), detailCoupon);
router.post('/coupon/change-status', checkPermission(PERMISSIONS.CHANGE_STATUS), statusChange);
router.get('/coupon/activecoupon',   activeCoupon);


module.exports = router;
