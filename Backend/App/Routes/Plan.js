const router = require("express").Router()
const { checkPermission } = require('../Middleware/permissionMiddleware'); // Path to your middleware
const {AddPlan,getPlan,updatePlan,deletePlan,detailPlan,statusChange,activePlan,addPlanSubscription} = require('../Controllers/Plan')


const PERMISSIONS = {
    ADD: 'addplan',
    VIEW: 'viewplan',
    ALL_VIEW: 'allviewplan',
    UPDATE: 'editplan',
    DELETE: 'deleteplan',
    CHANGE_STATUS: 'planchangestatus',
    addPlanSubscription: 'addPlanSubscription',
  };
  

router.post('/plan/add', checkPermission(PERMISSIONS.ADD), AddPlan);
router.get('/plan/list', checkPermission(PERMISSIONS.ALL_VIEW), getPlan);
router.put('/plan/update', checkPermission(PERMISSIONS.UPDATE), updatePlan);
router.get('/plan/delete/:id', checkPermission(PERMISSIONS.DELETE), deletePlan);
router.get('/plan/detail/:id', checkPermission(PERMISSIONS.VIEW), detailPlan);
router.post('/plan/change-status', checkPermission(PERMISSIONS.CHANGE_STATUS), statusChange);
router.get('/plan/activeplan',   activePlan);
router.post('/plan/addplansubscription',  checkPermission(PERMISSIONS.addPlanSubscription), addPlanSubscription); 



module.exports = router;
