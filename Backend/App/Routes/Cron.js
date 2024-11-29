const router = require("express").Router()

const {AddBulkStockCron,DeleteTokenAliceToken,TradingStatusOff,PlanExpire,downloadKotakNeotoken} = require('../Controllers/Cron')



router.get('/cron/add', AddBulkStockCron);
router.get('/cron/delete', DeleteTokenAliceToken);
router.get('/cron/tradingstatusoff', TradingStatusOff);
router.get('/cron/checknoitification', PlanExpire);
router.get('/cron/downloadkotakneotoken', downloadKotakNeotoken);


module.exports = router;
