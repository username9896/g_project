const mongoose = require('mongoose');

module.exports = mongoose.model('mqttdata', new mongoose.Schema({
    name: String
}, { collection: 'mqttdata' }));
