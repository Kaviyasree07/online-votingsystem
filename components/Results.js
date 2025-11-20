// Results.js
import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Pie,
  Bar
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";

import "./ResultsDashboard.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Results() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/voter/results")
      .then((res) => {
        console.log("RESULT DATA:", res.data);
        setCandidates(res.data);
      })
      .catch((err) => console.error("Error fetching results:", err));
  }, []);

  if (candidates.length === 0) return <p>Loading...</p>;

  const winner = candidates.reduce((max, c) =>
    c.votes > max.votes ? c : max
  );

  const totalVotes = candidates.reduce((a, c) => a + c.votes, 0);

  const pieData = {
    labels: candidates.map((c) => c.name),
    datasets: [
      {
        data: candidates.map((c) => c.votes),
        backgroundColor: ["#4C8BF5", "#F54291", "#42F554", "#F5A142", "#8E44AD"],
      }
    ]
  };

  const barData = {
    labels: candidates.map((c) => c.name),
    datasets: [
      {
        label: "Votes",
        data: candidates.map((c) => c.votes),
        backgroundColor: "#4C8BF5"
      }
    ]
  };

  return (
    <div className="results-page fadeIn">

      <h1 className="main-title">📊 Election Results Dashboard</h1>

      {/* Winner Card */}
      <div className="winner-card">
        <img
          src={winner.photo || "https://via.placeholder.com/120"}
          alt="winner"
          className="winner-img"
        />

        <div className="winner-info">
          <h2 className="winner-name">🏆 {winner.name}</h2>
          <p className="winner-party">{winner.party}</p>
          <p className="winner-votes">
            Total Votes: <b>{winner.votes}</b>
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <h3>{candidates.length}</h3>
          <p>Total Candidates</p>
        </div>

        <div className="stat-card">
          <h3>{totalVotes}</h3>
          <p>Total Votes Cast</p>
        </div>

        <div className="stat-card">
          <h3>
            {totalVotes > 0 ? ((winner.votes / totalVotes) * 100).toFixed(1) : 0}%
          </h3>
          <p>Winner Vote Share</p>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-row">
        <div className="chart-box">
          <h3>Vote Share (%)</h3>
          <Pie data={pieData} />
        </div>

        <div className="chart-box">
          <h3>Votes by Candidate</h3>
          <Bar data={barData} />
        </div>
      </div>

      {/* Table */}
      <h2 className="table-title">📋 Detailed Results</h2>

      <table className="results-table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Party</th>
            <th>Votes</th>
          </tr>
        </thead>

        <tbody>
          {candidates.map((c) => (
            <tr key={c._id}>
              <td>
                <img
                  src={c.photo || "https://via.placeholder.com/80"}
                  alt="candidate"
                  className="table-img"
                />
              </td>
              <td>{c.name}</td>
              <td>{c.party}</td>
              <td>{c.votes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Results;
