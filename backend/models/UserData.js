const mongoose = require('mongoose');

const UserDataSchema = new mongoose.Schema({
  site: String,
  timeSpent: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserData', UserDataSchema);
