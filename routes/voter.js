const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Candidate = require("../models/Candidate");
const Vote = require("../models/Vote");

router.get("/candidates", async (req, res) => {
  const data = await Candidate.find();
  res.json(data);
});

router.post("/vote", async (req, res) => {
  const { userId, candidateId } = req.body;

  const user = await User.findById(userId);
  const candidate = await Candidate.findById(candidateId);

  if (!user) return res.status(404).json({ message: "User not found" });
  if (!candidate) return res.status(404).json({ message: "Candidate not found" });

  if (user.hasVoted) {
    return res.status(400).json({ message: "Already voted" });
  }

  await Vote.create({ voterId: userId, candidateId });
  candidate.votes += 1;
  await candidate.save();

  user.hasVoted = true;
  user.hasVotedFor = candidateId;
  await user.save();

  res.json({ message: "Vote recorded successfully" });
});

router.get("/results", async (req, res) => {
  const results = await Candidate.find();
  res.json(results);
});

module.exports = router;
