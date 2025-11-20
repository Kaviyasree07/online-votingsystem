import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/auth/register',);
    alert("Registration successful! Now login.");
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>
        <input name="username" className="form-control mb-2" placeholder="Full Name" onChange={handleChange} required />
        <input name="email" className="form-control mb-2" placeholder="Email" onChange={handleChange} required />
        <input name="password" className="form-control mb-2" placeholder="Password" onChange={handleChange} required />

        <input name="voterId" className="form-control mb-2" placeholder="Voter ID Number" onChange={handleChange} required />
        <input name="votingPin" className="form-control mb-2" placeholder="4-digit Voting PIN" onChange={handleChange} required />

<button className="btn btn-primary w-100">Register</button>

      </form>
    </div>
  );
}

export default Register;
