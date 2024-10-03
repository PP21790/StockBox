const router = require("express").Router()
const multer = require('multer');
const path = require('path');


const {GetAccessToken} = require('../Controllers/Angle')

router.get('/angle/getaccesstoken', GetAccessToken);

module.exports = router;
