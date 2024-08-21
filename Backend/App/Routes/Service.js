const router = require("express").Router()
const {AddService,getService,updateService,deleteService,detailService} = require('../Controllers/Service')

router.post('/service/add', AddService);
router.get('/service/list', getService);
router.put('/service/update', updateService);
router.get('/service/delete/:id', deleteService);
router.get('/service/detail/:id', detailService);

module.exports = router;
