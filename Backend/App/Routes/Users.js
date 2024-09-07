const router = require("express").Router()
const { checkPermission } = require('../Middleware/permissionMiddleware'); // Path to your middleware

const {AddUser,getUser,updateUser,deleteUser,detailUser,loginUser,statusChange,updateUserPermissions,forgotPassword,resetPassword,changePassword,updateProfile,activeUser} = require('../Controllers/Users')


const PERMISSIONS = {
    ADD: 'adduser',
    VIEW: 'viewuser',
    ALL_VIEW: 'allviewuser',
    UPDATE: 'edituser',
    DELETE: 'deleteuser',
    CHANGE_STATUS: 'userchangestatus',
    UPDATE_PERMISSIONS: 'updatepermissions'
  };

  
  // Apply permission checks
  router.post('/user/add', checkPermission(PERMISSIONS.ADD), AddUser);
  router.get('/user/list', checkPermission(PERMISSIONS.ALL_VIEW), getUser);
  router.put('/user/update', checkPermission(PERMISSIONS.UPDATE), updateUser);
  router.get('/user/delete/:id', checkPermission(PERMISSIONS.DELETE), deleteUser);
  router.get('/user/detail/:id', checkPermission(PERMISSIONS.VIEW), detailUser);
  router.post('/user/login', loginUser); // No permission check for login
  router.post('/user/change-status', checkPermission(PERMISSIONS.CHANGE_STATUS), statusChange);
  router.post('/user/update-permissions', checkPermission(PERMISSIONS.UPDATE_PERMISSIONS), updateUserPermissions);
  router.post('/user/forgot-password', forgotPassword);
  router.post('/user/reset-password', resetPassword);
  router.post('/user/change-password', changePassword);
  router.post('/user/update-profile', updateProfile);
  router.get('/user/activeUser',checkPermission(PERMISSIONS.ALL_VIEW),   activeUser);

  
  
  module.exports = router;
