const router = require("express").Router()
const { checkPermission } = require('../Middleware/permissionMiddleware'); // Path to your middleware

const {AddFaq,getFaq,updateFaq,deleteFaq,detailFaq,statusChange,activeFaq} = require('../Controllers/Faq')

const PERMISSIONS = {
    ADD: 'addfaq',
    VIEW: 'viewfaq',
    ALL_VIEW: 'allviewfaq',
    UPDATE: 'editfaq',
    DELETE: 'deletefaq',
    CHANGE_STATUS: 'faqchangestatus',
  };


router.post('/faq/add', checkPermission(PERMISSIONS.ADD), AddFaq);
router.get('/faq/list', checkPermission(PERMISSIONS.ALL_VIEW), getFaq);
router.put('/faq/update', checkPermission(PERMISSIONS.UPDATE), updateFaq);
router.get('/faq/delete/:id', checkPermission(PERMISSIONS.DELETE), deleteFaq);
router.get('/faq/detail/:id', checkPermission(PERMISSIONS.VIEW), detailFaq);
router.post('/faq/change-status', checkPermission(PERMISSIONS.CHANGE_STATUS), statusChange);
router.get('/faq/activefaq',   activeFaq);

module.exports = router;
