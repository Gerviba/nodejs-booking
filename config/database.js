const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo');

module.exports = mongoose;