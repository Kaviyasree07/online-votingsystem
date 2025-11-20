import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user data
    localStorage.removeItem("user");

    // Redirect to login after 500ms
    setTimeout(() => {
      navigate("/login");
    }, 500);
  }, [navigate]);

  return (
    <h3 className="text-center mt-4 text-danger">Logging out...</h3>
  );
}

export default Logout;
