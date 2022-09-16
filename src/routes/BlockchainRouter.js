const express = require('express');
const BlockchainController = require('../app/controller/BlockchainController');
const router = express.Router();


router.get('/createblock' , BlockchainController.createblock )

module.exports = router;