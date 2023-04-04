const mongoose = require('mongoose');

module.exports = mongoose.model('securityDevice', new mongoose.Schema({
    id: String,
    name: String,
    user: String
}, { collection: 'SecurityDevices' }));