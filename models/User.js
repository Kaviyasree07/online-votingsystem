// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },

  voterId:   { type: String, required: true },     // e.g. TN1234567
  votingPin: { type: String, required: true },     // initial PIN (optional) - you can set a default or let register set it
  tempPin:   { type: Number, default: null },      // PIN generated at login and emailed

  hasVoted:    { type: Boolean, default: false },
  hasVotedFor: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', default: null },
  isAdmin:     { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
