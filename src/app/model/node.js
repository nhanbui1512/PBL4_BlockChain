const mongoose = require('mongoose')
const Schema = mongoose.Schema

const node = new Schema ({
    nodeAddress: {type: String, default: '' },
});

module.exports = mongoose.model('node', node)
