const router = require("express").Router()
const multer = require('multer');
const path = require('path');

const {GetAccessToken} = require('../Controllers/Aliceblue')

router.get('/aliceblue/getaccesstoken', GetAccessToken);

module.exports = router;
