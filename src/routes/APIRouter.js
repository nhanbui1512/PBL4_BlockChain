const express = require('express');
const APIController = require('../app/controller/APIController');

const router = express.Router();

router.get('/Users',APIController.getAllUser)
router.get('/DoanhNghiep', APIController.getAllThongTinDoanhNghiep)
router.get('/ttkiemdinh',APIController.getAllCQKiemDinh)
router.get('/doanhnghiep/:id', APIController.getDoanhNghiepByID)
router.get('/nodes',APIController.getAllNodeAddress)

module.exports = router;