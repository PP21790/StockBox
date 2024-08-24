const router = require("express").Router()
const { checkPermission } = require('../Middleware/permissionMiddleware'); // Path to your middleware
const {AddNews,getNews,updateNews,deleteNews,detailNews,statusChange} = require('../Controllers/News')

const PERMISSIONS = {
    ADD: 'addnews',
    VIEW: 'viewnews',
    ALL_VIEW: 'allviewnews',
    UPDATE: 'editnews',
    DELETE: 'deletenews',
    CHANGE_STATUS: 'changestatus',
  };
  


router.post('/news/add', checkPermission(PERMISSIONS.ADD), AddNews);
router.get('/news/list', checkPermission(PERMISSIONS.ALL_VIEW), getNews);
router.put('/news/update', checkPermission(PERMISSIONS.UPDATE), updateNews);
router.get('/news/delete/:id', checkPermission(PERMISSIONS.DELETE), deleteNews);
router.get('/news/detail/:id', checkPermission(PERMISSIONS.VIEW), detailNews);
router.post('/news/change-status', checkPermission(PERMISSIONS.CHANGE_STATUS), statusChange);

module.exports = router;
