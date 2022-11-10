const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chain = new Schema ({
    preHash: {type: String, default: '' },
    data: {type: Object, default: {} },
    timeStamp: {type: String, default: ''},
    hash:{type: String, default: ''},
    mineVar:{type: Number},
});

module.exports = mongoose.model('chain', chain)
