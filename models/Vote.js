// backend/models/Vote.js

const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  voterId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate", required: true },
  votedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Vote", voteSchema);
