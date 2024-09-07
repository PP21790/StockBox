const router = require("express").Router()
const { checkPermission } = require('../Middleware/permissionMiddleware'); // Path to your middleware

const {AddPlancategory,getPlancategory,updatePlancategory,deletePlancategory,detailPlancategory,statusChange,activePlancategory} = require('../Controllers/Plancategory')

const PERMISSIONS = {
    ADD: 'addplancategory',
    VIEW: 'viewplancategory',
    ALL_VIEW: 'allviewplancategory',
    UPDATE: 'editplancategory',
    DELETE: 'deleteplancategory',
    CHANGE_STATUS: 'plancategorychangestatus',
  };
  


router.post('/plancategory/add', checkPermission(PERMISSIONS.ADD), AddPlancategory);
router.get('/plancategory/list',  checkPermission(PERMISSIONS.ALL_VIEW), getPlancategory);
router.put('/plancategory/update',  checkPermission(PERMISSIONS.UPDATE), updatePlancategory);
router.get('/plancategory/delete/:id',  checkPermission(PERMISSIONS.DELETE), deletePlancategory);
router.get('/plancategory/detail/:id',  checkPermission(PERMISSIONS.VIEW), detailPlancategory);
router.post('/plancategory/change-status',  checkPermission(PERMISSIONS.CHANGE_STATUS), statusChange);
router.get('/plancategory/activeplancategory',   activePlancategory);


module.exports = router;
