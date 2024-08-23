const router = require("express").Router()
const { checkPermission } = require('../Middleware/permissionMiddleware'); // Path to your middleware

const {AddService,getService,updateService,deleteService,detailService,statusChange} = require('../Controllers/Service')

const PERMISSIONS = {
    ADD: 'addservice',
    VIEW: 'viewservice',
    ALL_VIEW: 'allviewservice',
    UPDATE: 'editservice',
    DELETE: 'deleteservice',
    CHANGE_STATUS: 'changestatus',
  };
  


router.post('/service/add', checkPermission(PERMISSIONS.ADD), AddService);
router.get('/service/list',  checkPermission(PERMISSIONS.ALL_VIEW), getService);
router.put('/service/update',  checkPermission(PERMISSIONS.UPDATE), updateService);
router.get('/service/delete/:id',  checkPermission(PERMISSIONS.DELETE), deleteService);
router.get('/service/detail/:id',  checkPermission(PERMISSIONS.VIEW), detailService);
router.post('/service/change-status',  checkPermission(PERMISSIONS.CHANGE_STATUS), statusChange);

module.exports = router;
