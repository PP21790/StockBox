const router = require("express").Router()
const {AddClient,getClient,updateClient,deleteClient,detailClient} = require('../Controllers/Clients')

router.post('/client/add', AddClient);
router.get('/client/list', getClient);
router.put('/client/update', updateClient);
router.get('/client/delete/:id', deleteClient);
router.get('/client/detail/:id', detailClient);


module.exports = router;
