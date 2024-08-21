const router = require("express").Router()
const {AddBasicSetting,getSettings} = require('../Controllers/BasicSetting')

router.post('/basicsetting/add', AddBasicSetting);
router.get('/basicsetting/detail', getSettings);



module.exports = router;
