const router = require("express").Router()
const {getcount,getLicense} = require('../Controllers/Dashboard')

router.get('/dashboard/getcount', getcount);
router.post('/dashboard/getlicense', getLicense);



module.exports = router;
