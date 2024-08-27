const router = require("express").Router()
const { checkPermission } = require('../Middleware/permissionMiddleware'); // Path to your middleware
const {AddBasket,getBasket,updateBasket,deleteBasket,detailBasket,statusChange,activeBasket} = require('../Controllers/Basket')


const PERMISSIONS = {
    ADD: 'addbasket',
    VIEW: 'viewbasket',
    ALL_VIEW: 'allviewbasket',
    UPDATE: 'editbasket',
    DELETE: 'deletebasket',
    CHANGE_STATUS: 'basketchangestatus',
  };
  

router.post('/basket/add', checkPermission(PERMISSIONS.ADD), AddBasket);
router.get('/basket/list', checkPermission(PERMISSIONS.ALL_VIEW), getBasket);
router.put('/basket/update', checkPermission(PERMISSIONS.UPDATE), updateBasket);
router.get('/basket/delete/:id', checkPermission(PERMISSIONS.DELETE), deleteBasket);
router.get('/basket/detail/:id', checkPermission(PERMISSIONS.VIEW), detailBasket);
router.post('/basket/change-status', checkPermission(PERMISSIONS.CHANGE_STATUS), statusChange);
router.get('/basket/activebasket',   activeBasket);


module.exports = router;
