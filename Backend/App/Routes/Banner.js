const router = require("express").Router()
const multer = require('multer');
const path = require('path');

const { checkPermission } = require('../Middleware/permissionMiddleware');

const {AddBanner,getBanner,updateBanner,deleteBanner,detailBanner,statusChange,activeBanner} = require('../Controllers/Banner')

const PERMISSIONS = {
    ADD: 'addbanner',
    VIEW: 'viewbanner',
    ALL_VIEW: 'allviewbanner',
    UPDATE: 'editbanner',
    DELETE: 'deletebanner',
    CHANGE_STATUS: 'bannerchangestatus',
  };



router.post('/banner/add', checkPermission(PERMISSIONS.ADD), AddBanner);
router.get('/banner/list', checkPermission(PERMISSIONS.ALL_VIEW), getBanner);
router.post('/banner/update', checkPermission(PERMISSIONS.UPDATE), updateBanner);
router.get('/banner/delete/:id', checkPermission(PERMISSIONS.DELETE), deleteBanner);
router.get('/banner/detail/:id', checkPermission(PERMISSIONS.VIEW), detailBanner);
router.post('/banner/change-status', checkPermission(PERMISSIONS.CHANGE_STATUS), statusChange);
router.get('/banner/activebanner',   activeBanner);


module.exports = router;
