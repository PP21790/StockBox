const router = require("express").Router()
const {AddUser,getUser,updateUser,deleteUser,detailUser,loginUser} = require('../Controllers/Users')

router.post('/user/add', AddUser);
router.get('/user/list', getUser);
router.put('/user/update', updateUser);
router.get('/user/delete/:id', deleteUser);
router.get('/user/detail/:id', detailUser);
router.post('/user/login', loginUser);

module.exports = router;
