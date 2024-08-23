const router = require("express").Router()
const { checkPermission } = require('../Middleware/permissionMiddleware');

const {AddClient,getClient,updateClient,deleteClient,detailClient,statusChange} = require('../Controllers/Clients')


const PERMISSIONS = {
    ADD: 'addclient',
    VIEW: 'viewclient',
    ALL_VIEW: 'allviewclient',
    UPDATE: 'editclient',
    DELETE: 'deleteclient',
    CHANGE_STATUS: 'changestatus',
  };

router.post('/client/add', checkPermission(PERMISSIONS.ADD), AddClient);
router.get('/client/list', checkPermission(PERMISSIONS.ALL_VIEW), getClient);
router.put('/client/update', checkPermission(PERMISSIONS.UPDATE), updateClient);
router.get('/client/delete/:id', checkPermission(PERMISSIONS.DELETE), deleteClient);
router.get('/client/detail/:id', checkPermission(PERMISSIONS.VIEW), detailClient);
router.post('/client/change-status', checkPermission(PERMISSIONS.CHANGE_STATUS), statusChange);


module.exports = router;
