const express = require('express');
const APIController = require('../app/controller/APIController');

const router = express.Router();

router.get('/Users',APIController.getAllUser)
router.get('/DoanhNghiep', APIController.getAllThongTinDoanhNghiep)
module.exports = router;