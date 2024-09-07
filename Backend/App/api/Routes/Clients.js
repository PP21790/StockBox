const router = require("express").Router()

const {AddClient,detailClient,loginClient,forgotPassword,resetPassword,changePassword,updateProfile} = require('../Controllers/Clients')


router.post('/api/client/add',AddClient);
router.get('/api/client/detail/:id', detailClient);
router.post('/api/client/login', loginClient); 
router.post('/api/client/forgot-password', forgotPassword);
router.post('/api/client/reset-password', resetPassword);
router.post('/api/client/change-password', changePassword);
router.post('/api/client/update-profile', updateProfile);


module.exports = router;
