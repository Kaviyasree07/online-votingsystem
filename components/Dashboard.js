import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.25)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "25px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
    transition: "0.3s",
    cursor: "pointer",
  };

  return (
    <div
      className="dashboard-fullscreen"
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      }}
    >
      <h2 className="text-center mb-5 fw-bold" style={{ color: "#333" }}>
         User Dashboard
      </h2>

      <div className="row justify-content-center">

        {/* Vote Card */}
        <div
          className="col-md-4 m-3"
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.06)";
            e.currentTarget.style.boxShadow = "0 0 25px rgba(0, 150, 255, 0.7)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow =
              "0 8px 32px rgba(0,0,0,0.2)";
          }}
          onClick={() => navigate("/vote")}
        >
          <h4 className="text-center">🗳️ Cast Your Vote</h4>
          <p className="text-center">Choose your preferred leader.</p>
        </div>

        {/* Results Card */}
        <div
          className="col-md-4 m-3"
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.06)";
            e.currentTarget.style.boxShadow = "0 0 25px rgba(255, 0, 150, 0.7)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow =
              "0 8px 32px rgba(0,0,0,0.2)";
          }}
          onClick={() => navigate("/results")}
        >
          <h4 className="text-center">📊 View Results</h4>
          <p className="text-center">Track live election standings.</p>
        </div>

        {/* Profile Card */}
        <div
          className="col-md-4 m-3"
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.06)";
            e.currentTarget.style.boxShadow =
              "0 0 25px rgba(255, 180, 0, 0.7)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow =
              "0 8px 32px rgba(0,0,0,0.2)";
          }}
          onClick={() => navigate("/profile")}
        >
          <h4 className="text-center">👤 Profile</h4>
          <p className="text-center">View your voting status.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
