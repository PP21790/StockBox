const router = require("express").Router()
const { checkPermission } = require('../Middleware/permissionMiddleware');

const {AddBasicSetting,getSettings} = require('../Controllers/BasicSetting')


const PERMISSIONS = {
    ADD: 'addsetting',
  };

router.post('/basicsetting/add', AddBasicSetting);
router.get('/basicsetting/detail', getSettings);



module.exports = router;
