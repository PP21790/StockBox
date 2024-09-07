const router = require("express").Router()
const { checkPermission } = require('../Middleware/permissionMiddleware'); // Path to your middleware

const {AddSignal,getSignal,deleteSignal,detailSignal,closeSignal,targethitSignal} = require('../Controllers/Signal')

const PERMISSIONS = {
    ADD: 'addsignal',
    VIEW: 'viewsignal',
    ALL_VIEW: 'allviewsignal',
    DELETE: 'deletesignal',
    CLOSE: 'closesignal',
    HIT: 'targethit',
  };
  

  closeSignal
router.post('/signal/add', checkPermission(PERMISSIONS.ADD), AddSignal);
router.get('/signal/list',  checkPermission(PERMISSIONS.ALL_VIEW), getSignal);
router.get('/signal/delete/:id',  checkPermission(PERMISSIONS.DELETE), deleteSignal);
router.get('/signal/detail/:id',  checkPermission(PERMISSIONS.VIEW), detailSignal);
router.post('/signal/closesignal', checkPermission(PERMISSIONS.CLOSE), closeSignal);
router.post('/signal/targethitsignal', checkPermission(PERMISSIONS.HIT), targethitSignal);


module.exports = router;