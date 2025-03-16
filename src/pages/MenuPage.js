/* /////////////////////////////////////////////////////////////////////////////// 
PURPOSE & FUNCTIONALITY:
This page direct the user to:
1) Display screen selection
2) Update/Change display information.
////////////////////////////////////////////////////////////////////////////////*/

import React from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook

export default function MenuPage() {
  const navigate = useNavigate(); // Hook for navigation

  const handlePortScreenClick = () => {
    navigate("/PortScreenChoice"); // Redirect to port screen coice page}
  };

  const handleChangeUpdateClick = () => {
    navigate("/ChangeUpdatePage"); // Redirect to port screen coice page}
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "700px", width: "100%" }}
      >
        <div className="row g-0">
          {/******************************** Logo Section (Left) ******************************/}
          <div className="col-md-5 d-flex align-items-center justify-content-center bg-light">
            <img
              src="/arla-logo.png"
              alt="Logo"
              className="img-fluid"
              style={{ maxWidth: "120px" }}
            />
          </div>

          <div className="col-md-7 p-4 ">
            {/********************* Right hand side section *******************/}
            {/* Brand name */}
            <h3
              className="mb-3 text-center"
              style={{ fontFamily: "'Syncopate', sans-serif" }}
            >
              InfoSync
            </h3>{" "}
            <hr />
            <p className="text-muted text-center">välj ett alternativ</p>
            {/* Button section */}
            <div className="row-md-7 p-1 d-grid ">
              <button
                className="btn btn-success m-2"
                onClick={handlePortScreenClick}
              >
                Portskärm
              </button>
              <button
                className="btn btn-success m-2"
                onClick={handleChangeUpdateClick}
              >
                Ändra/Uppdatera
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
