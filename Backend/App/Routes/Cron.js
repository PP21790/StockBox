const router = require("express").Router()

const {AddBulkStockCron} = require('../Controllers/Cron')



router.get('/cron/add', AddBulkStockCron);


module.exports = router;
