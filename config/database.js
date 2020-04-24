const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/accommodation');

module.exports = mongoose;