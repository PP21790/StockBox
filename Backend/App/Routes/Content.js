const router = require("express").Router()
const { checkPermission } = require('../Middleware/permissionMiddleware'); // Path to your middleware

const {AddContent,getContent,updateContent,deleteContent,detailContent,statusChange,activeContent} = require('../Controllers/Content')

const PERMISSIONS = {
    ADD: 'addcontent',
    VIEW: 'viewcontent',
    ALL_VIEW: 'allviewcontent',
    UPDATE: 'editcontent',
    DELETE: 'deletecontent',
    CHANGE_STATUS: 'contentchangestatus',
  };


router.post('/content/add', checkPermission(PERMISSIONS.ADD), AddContent);
router.get('/content/list', checkPermission(PERMISSIONS.ALL_VIEW), getContent);
router.put('/content/update', checkPermission(PERMISSIONS.UPDATE), updateContent);
router.get('/content/delete/:id', checkPermission(PERMISSIONS.DELETE), deleteContent);
router.get('/content/detail/:id', checkPermission(PERMISSIONS.VIEW), detailContent);
router.post('/content/change-status', checkPermission(PERMISSIONS.CHANGE_STATUS), statusChange);
router.get('/content/activecontent',   activeContent);

module.exports = router;
