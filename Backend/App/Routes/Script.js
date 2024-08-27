const router = require("express").Router()
const { checkPermission } = require('../Middleware/permissionMiddleware'); // Path to your middleware

const {AddScript,getScript,deleteScript,detailScript} = require('../Controllers/Script')

const PERMISSIONS = {
    ADD: 'addscript',
    VIEW: 'viewscript',
    ALL_VIEW: 'allviewscript',
    DELETE: 'deletescript',
  };
  


router.post('/script/add', checkPermission(PERMISSIONS.ADD), AddScript);
router.get('/script/list',  checkPermission(PERMISSIONS.ALL_VIEW), getScript);
router.get('/script/delete/:id',  checkPermission(PERMISSIONS.DELETE), deleteScript);
router.get('/script/detail/:id',  checkPermission(PERMISSIONS.VIEW), detailScript);


module.exports = router;
