import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminCandidates() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/voter/candidates")
      .then(res => setCandidates(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h3>Candidates</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(c => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.votes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
