const router = require("express").Router()
const {getcount,getLicense,pastPerformance,pastPerformances,CloseSignal,PlanExipreList,CloseSignalWithFilter,PlanExipreListWithFilter,CompanyStatus,Notification,statusChangeNotifiction,totalClient} = require('../Controllers/Dashboard')

router.get('/dashboard/getcount', getcount);
router.post('/dashboard/getlicense', getLicense);
router.get('/dashboard/past-performance/:id', pastPerformance);
router.get('/dashboard/past-performances', pastPerformances);
router.post('/dashboard/closesignal', CloseSignal);
router.post('/dashboard/closesignalwithfilter', CloseSignalWithFilter);

router.get('/dashboard/planexiprelist', PlanExipreList);
router.post('/dashboard/planexiprelistwithfilter', PlanExipreListWithFilter);

router.post('/dashboard/companystatus', CompanyStatus);
router.get('/dashboard/notification', Notification);
router.post('/dashboard/statuschangenotifiction', statusChangeNotifiction);
router.get('/dashboard/totalclientmonth', totalClient);


module.exports = router;
