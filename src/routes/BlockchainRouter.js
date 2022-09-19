const express = require('express');
const BlockchainController = require('../app/controller/BlockchainController');
const router = express.Router();


router.get('/createblock' , BlockchainController.createblock )
router.get('/chain', BlockchainController.getChain)
router.use('/mine' ,BlockchainController.mine )
router.use('/consensus', BlockchainController.consensus)
router.post('/register' , BlockchainController.rigisterNode)

module.exports = router;