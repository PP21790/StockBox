const router = require("express").Router()
const {getclientcount,getusercount,getservicecount} = require('../Controllers/Dashboard')

router.get('/dashboard/getclientcount', getclientcount);
router.get('/dashboard/getusercount', getusercount);
router.get('/dashboard/getservicecount', getservicecount);



module.exports = router;
