const router = require("express").Router()
const multer = require('multer');
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage }); // Apply storage settings
const { checkPermission } = require('../Middleware/permissionMiddleware'); // Path to your middleware

const {AddStock,getStock,updateStock,deleteStock,detailStock,statusChange,AddBulkStock,activeStock} = require('../Controllers/Stock')

const PERMISSIONS = {
    ADD: 'addstock',
    VIEW: 'viewstock',
    ALL_VIEW: 'allviewstock',
    UPDATE: 'editstock',
    DELETE: 'deletestock',
    CHANGE_STATUS: 'stockchangestatus',
    ADDBULKSTOCK: 'addbulkstock',
  };
  


router.post('/stock/add', checkPermission(PERMISSIONS.ADD), AddStock);
router.get('/stock/list',  checkPermission(PERMISSIONS.ALL_VIEW), getStock);
router.put('/stock/update',  checkPermission(PERMISSIONS.UPDATE), updateStock);
router.get('/stock/delete/:id',  checkPermission(PERMISSIONS.DELETE), deleteStock);
router.get('/stock/detail/:id',  checkPermission(PERMISSIONS.VIEW), detailStock);
router.post('/stock/change-status',  checkPermission(PERMISSIONS.CHANGE_STATUS), statusChange);
router.post('/stock/addbulkstock',  checkPermission(PERMISSIONS.ADDBULKSTOCK), upload.single('file'), AddBulkStock);
router.get('/stock/activestock',   activeStock);


module.exports = router;
