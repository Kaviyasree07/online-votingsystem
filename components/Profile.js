import React from "react";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="text-center">
      <h2>👤 Profile</h2>
      <p><strong>Name:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Voted:</strong> {user.hasVoted ? "✔ Yes" : "❌ No"}</p>
    </div>
  );
}

export default Profile;
