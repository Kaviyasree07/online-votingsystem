// backend/routes/admin.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Candidate = require('../models/Candidate');
const Vote = require('../models/Vote');

// Middleware: check admin by passing adminId in body or query
async function checkAdmin(req, res, next) {
  try {
    const adminId = req.body.adminId || req.query.adminId || req.headers['x-admin-id'];
    if (!adminId) return res.status(401).json({ message: 'Admin ID required' });
    const admin = await User.findById(adminId);
    if (!admin || !admin.isAdmin) return res.status(403).json({ message: 'Admin access denied' });
    req.admin = admin;
    next();
  } catch (err) {
    console.error('Admin auth error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

// GET /api/admin/stats?adminId=...
router.get('/stats', checkAdmin, async (req, res) => {
  try {
    const totalCandidates = await Candidate.countDocuments();
    const totalVoters = await User.countDocuments();
    const totalVotes = await Vote.countDocuments();
    // find leading candidate
    const candidates = await Candidate.find().sort({ votes: -1 }).limit(1);
    const leader = candidates[0] || null;

    res.json({ totalCandidates, totalVoters, totalVotes, leader });
  } catch (err) {
    console.error('Stats error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/admin/candidates?adminId=...
router.get('/candidates', checkAdmin, async (req, res) => {
  try {
    const list = await Candidate.find().sort({ name: 1 });
    res.json(list);
  } catch (err) {
    console.error('Candidates list error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/admin/candidates  { adminId, name, party, photo, logo }
router.post('/candidates', checkAdmin, async (req, res) => {
  try {
    const { name, party, photo, logo } = req.body;
    if (!name) return res.status(400).json({ message: 'Name required' });
    const cand = new Candidate({ name, party, photo, logo, votes: 0 });
    await cand.save();
    res.json({ message: 'Candidate added', candidate: cand });
  } catch (err) {
    console.error('Add candidate error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/admin/candidates/:id?adminId=...
router.delete('/candidates/:id', checkAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    await Candidate.findByIdAndDelete(id);
    // also delete votes referencing candidate (optional)
    await Vote.deleteMany({ candidateId: id });
    res.json({ message: 'Candidate deleted' });
  } catch (err) {
    console.error('Delete candidate error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/admin/voters?adminId=...
router.get('/voters', checkAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ username: 1 });
    res.json(users);
  } catch (err) {
    console.error('Voters list error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/admin/reset  { adminId }
// Resets votes and users.hasVoted
router.post('/reset', checkAdmin, async (req, res) => {
  try {
    // Reset candidate votes
    await Candidate.updateMany({}, { $set: { votes: 0 } });
    // Remove all votes documents
    await Vote.deleteMany({});
    // Reset users voting flag
    await User.updateMany({}, { $set: { hasVoted: false } });
    res.json({ message: 'Voting reset successful' });
  } catch (err) {
    console.error('Reset error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
