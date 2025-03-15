import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook

export default function LogInPage() { // TO-DO implement authentification
  const correctUserName = "Gs1"; // Hardcoded credentials
  const correctPassword = "Start1234";

  const [userName, setUserName] = useState(""); // State for username input
  const [password, setPassword] = useState(""); // State for password input

  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form submission refresh

    if (userName === correctUserName && password === correctPassword) {
      navigate("/MenuPage"); // Redirect to Menu Page
    } else {
      alert("Fel Användarnamn eller Lösenord!");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "700px", width: "100%" }}
      >
        <div className="row g-0">
          {/* Logo Section */}
          <div className="col-md-5 d-flex align-items-center justify-content-center bg-light">
            <img
              src="/arla-logo.png"
              alt="Logo"
              className="img-fluid"
              style={{ maxWidth: "120px" }}
            />
          </div>

          {/* Form Section */}
          <div className="col-md-7 p-4">
            <h3 className="mb-3 text-center">Terminaldisplaysystem</h3>
            <p className="text-muted text-center">Logga in för att fortsätta</p>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Användarnamn</label>
                <input
                  type="text"
                  className="form-control"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)} // Update username state
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Lösenord</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state
                  required
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-success">
                  Logga in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
