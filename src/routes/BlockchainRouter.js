const express = require('express');
const BlockchainController = require('../app/controller/BlockchainController');

const router = express.Router();


router.get('/createblock' , BlockchainController.createblock )
router.get('/chain', BlockchainController.getChain)
router.post('/mine' ,BlockchainController.mine )
router.get('/consensus', BlockchainController.consensus)
router.post('/register' , BlockchainController.rigisterNode)
router.get('/nodes', BlockchainController.nodes)
router.get('/isvalid',BlockchainController.isValid)
router.post('/ThemChungChi',BlockchainController.ThemChungChi)
router.get('/checkdb',BlockchainController.checkDB)
router.get('/',BlockchainController.startServer);

module.exports = router;