import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Vote.css";

function Vote() {
  const [candidates, setCandidates] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    axios
      .get("http://localhost:5000/api/voter/candidates")
      .then((res) => setCandidates(res.data))
      .catch((err) => console.error("Error fetching candidates:", err));
  }, []);

  const vote = async (candidateId) => {
    if (!user) {
      alert("Please log in first!");
      return;
    }

    setSelectedId(candidateId);

    try {
      const res = await axios.post("http://localhost:5000/api/voter/vote", {
        userId: user._id,
        candidateId: candidateId,
      });

      alert(res.data.message || "Vote recorded successfully!");

      const updatedUser = { ...user, hasVoted: true, hasVotedFor: candidateId };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

    } catch (err) {
      alert(err.response?.data?.message || "Error submitting vote. Please try again.");
    }
  };

  return (
    <div className="vote-page-bg">

      <div className="quote-box">
        <h2>“The ballot is stronger than the bullet.”</h2>
        <p>Every vote shapes the future. Make yours count.</p>
      </div>

      <h2 className="vote-title">🗳 Cast Your Vote</h2>

      <div className="vote-grid">
        {candidates.map((c) => (
          <div
            key={c._id}
            className={`candidate-card hover-grow ${
              selectedId === c._id ? "selected-card" : ""
            }`}
          >
            <img src={c.photo} alt={c.name} className="candidate-photo" />

            <h4>{c.name}</h4>
            <p className="party-name">{c.party}</p>

            {!user?.hasVoted ? (
              <button className="vote-btn" onClick={() => vote(c._id)}>
                Vote
              </button>
            ) : user.hasVotedFor === c._id ? (
              <div className="voted-badge">✔ You Voted</div>
            ) : (
              <div className="closed-badge">Voting Closed</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Vote;
