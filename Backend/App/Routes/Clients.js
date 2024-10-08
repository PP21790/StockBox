const router = require("express").Router()
const { checkPermission } = require('../Middleware/permissionMiddleware');

const {AddClient,getClient,updateClient,deleteClient,detailClient,statusChange,activeClient,processPayoutRequest,payoutList} = require('../Controllers/Clients')


const PERMISSIONS = {
    ADD: 'addclient',
    VIEW: 'viewclient',
    ALL_VIEW: 'allviewclient',
    UPDATE: 'editclient',
    DELETE: 'deleteclient',
    CHANGE_STATUS: 'clientchangestatus',
  };

router.post('/client/add', AddClient);
router.get('/client/list', getClient);
router.put('/client/update', updateClient);
router.get('/client/delete/:id', deleteClient);
router.get('/client/detail/:id', detailClient);
router.post('/client/change-status', statusChange);
router.get('/client/activeclient',   activeClient);
router.get('/client/payoutlist', payoutList);
router.post('/client/process-payout-request', processPayoutRequest);


module.exports = router;
