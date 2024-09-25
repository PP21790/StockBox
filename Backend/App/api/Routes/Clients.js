const router = require("express").Router()

const {AddClient,detailClient,loginClient,forgotPassword,resetPassword,changePassword,updateProfile,deleteClient,otpSubmit,aadhaarVerification,aadhaarOtpSubmit,clientKycAndAgreement} = require('../Controllers/Clients')


router.post('/api/client/add',AddClient);
router.get('/api/client/detail/:id', detailClient);
router.post('/api/client/login', loginClient); 
router.post('/api/client/forgot-password', forgotPassword);
router.post('/api/client/reset-password', resetPassword);
router.post('/api/client/change-password', changePassword);
router.post('/api/client/update-profile', updateProfile);
router.get('/api/client/deleteclient/:id', deleteClient);
router.post('/api/client/otp_submit', otpSubmit);
router.post('/api/client/aadhaarverification', aadhaarVerification);
router.post('/api/client/aadhaarotpsubmit', aadhaarOtpSubmit);
router.post('/api/client/clientkycandagreement', clientKycAndAgreement);



module.exports = router;
