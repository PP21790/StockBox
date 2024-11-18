const router = require("express").Router()
const {getcount,getLicense,pastPerformance,pastPerformances,CloseSignal,PlanExipreList,CloseSignalWithFilter,PlanExipreListWithFilter} = require('../Controllers/Dashboard')

router.get('/dashboard/getcount', getcount);
router.post('/dashboard/getlicense', getLicense);
router.get('/dashboard/past-performance/:id', pastPerformance);
router.get('/dashboard/past-performances', pastPerformances);
router.post('/dashboard/closesignal', CloseSignal);
router.post('/dashboard/closesignalwithfilter', CloseSignalWithFilter);

router.get('/dashboard/planexiprelist', PlanExipreList);
router.get('/dashboard/planexiprelistwithfilter', PlanExipreListWithFilter);


module.exports = router;
