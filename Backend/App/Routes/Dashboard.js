const router = require("express").Router()
const {getcount,getLicense,pastPerformance,pastPerformances,CloseSignal,PlanExipreList} = require('../Controllers/Dashboard')

router.get('/dashboard/getcount', getcount);
router.post('/dashboard/getlicense', getLicense);
router.get('/dashboard/past-performance/:id', pastPerformance);
router.get('/dashboard/past-performances', pastPerformances);
router.post('/dashboard/closesignal', CloseSignal);
router.get('/dashboard/planexiprelist', PlanExipreList);


module.exports = router;
