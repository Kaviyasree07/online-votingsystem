import axios from "axios";
import { useState } from "react";

export default function AdminAddCandidate() {
  const [name, setName] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/admin/add-candidate", { name });
    alert("Candidate added!");
    setName("");
  };

  return (
    <div className="col-md-6">
      <h3>Add Candidate</h3>
      <form onSubmit={submit}>
        <input
          className="form-control mb-2"
          placeholder="Candidate Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button className="btn btn-primary">Add</button>
      </form>
    </div>
  );
}
