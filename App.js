// App.js
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

// USER PAGES
import Vote from "./components/Vote";
import Results from "./components/Results";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";  

// ADMIN PAGES
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminCandidates from "./admin/AdminCandidates";
import AdminAddCandidate from "./admin/AdminAddCandidate";
import AdminVoters from "./admin/AdminVoters";

// NORMAL PROTECTED ROUTE
const ProtectedRoute = ({ element }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? element : <Navigate to="/login" />;
};

// ⭐ NEW — PROTECTED RESULTS ROUTE  
// Block results page until user votes
const ProtectedResults = ({ element }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/login" />;

  if (!user.hasVoted) {
    alert("Please vote first to view the results!");
    return <Navigate to="/vote" />;
  }

  return element;
};

export default function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">🗳 Voting System</Link>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">

              {/* USER NAVIGATION */}
              {user && !user.isAdmin && (
                <>
                  <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/vote">Vote</Link></li>

                  {/* ⭐ RESULTS NAVIGATION IS UNCHANGED */}
                  <li className="nav-item"><Link className="nav-link" to="/results">Results</Link></li>

                  <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
                </>
              )}

              {/* ADMIN NAVIGATION */}
              {user && user.isAdmin && (
                <>
                  <li className="nav-item"><Link className="nav-link" to="/admin">Admin Home</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/admin/candidates">Candidates</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/admin/add-candidate">Add Candidate</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/admin/voters">Voters</Link></li>
                </>
              )}
            </ul>

            {/* LOGIN / LOGOUT */}
            <ul className="navbar-nav ms-auto">
              {!user ? (
                <>
                  <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                </>
              ) : (
                <li className="nav-item">
                  <button
                    className="btn btn-danger btn-sm mt-1"
                    onClick={() => {
                      localStorage.removeItem("user");
                      window.location.href = "/login";
                    }}
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* ROUTES */}
      <div className="container mt-4">
        <Routes>

          {/* PUBLIC */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* USER PROTECTED */}
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/vote" element={<ProtectedRoute element={<Vote />} />} />

          {/* ⭐ RESULTS PROTECTION ADDED HERE */}
          <Route path="/results" element={<ProtectedResults element={<Results />} />} />

          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />

          {/* ADMIN PROTECTED */}
          <Route path="/admin" element={<ProtectedRoute element={<AdminLayout />} />}>
            <Route index element={<AdminDashboard />} />
            <Route path="candidates" element={<AdminCandidates />} />
            <Route path="add-candidate" element={<AdminAddCandidate />} />
            <Route path="voters" element={<AdminVoters />} />
          </Route>

        </Routes>
      </div>
    </Router>
  );
}
