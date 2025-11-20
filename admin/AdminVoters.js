import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminVoters() {
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/voters")
      .then(res => setVoters(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h3>Voters</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Email</th>
            <th>Voted?</th>
          </tr>
        </thead>
        <tbody>
          {voters.map(v => (
            <tr key={v._id}>
              <td>{v.email}</td>
              <td>{v.hasVoted ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
