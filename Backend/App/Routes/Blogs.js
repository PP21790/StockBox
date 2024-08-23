const router = require("express").Router()
const { checkPermission } = require('../Middleware/permissionMiddleware');

const {AddBlogs,getBlogs,updateBlogs,deleteBlogs,detailBlogs,statusChange} = require('../Controllers/Blogs')

const PERMISSIONS = {
    ADD: 'addblogs',
    VIEW: 'viewblogs',
    ALL_VIEW: 'allviewblogs',
    UPDATE: 'editblogs',
    DELETE: 'deleteblogs',
    CHANGE_STATUS: 'changestatus',
  };



router.post('/blogs/add', checkPermission(PERMISSIONS.ADD), AddBlogs);
router.get('/blogs/list', checkPermission(PERMISSIONS.ALL_VIEW), getBlogs);
router.put('/blogs/update', checkPermission(PERMISSIONS.UPDATE), updateBlogs);
router.get('/blogs/delete/:id', checkPermission(PERMISSIONS.DELETE), deleteBlogs);
router.get('/blogs/detail/:id', checkPermission(PERMISSIONS.VIEW), detailBlogs);
router.post('/blogs/change-status', checkPermission(PERMISSIONS.CHANGE_STATUS), statusChange);


module.exports = router;
