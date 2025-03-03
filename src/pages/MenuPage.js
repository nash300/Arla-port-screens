/*
<<<<<<<<<<<<<<<   LoginPage -> MenuPage    >>>>>>>>>>>>>
*
* About This Page---
* This page offers 2 options to the user
*
Portskärm---- 
Select/Allocate the port display.

Ändra/Uppdatera---
Update info to be sent into the port display screens
*/

import React from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook

export default function MenuPage() {
  const navigate = useNavigate(); // Hook for navigation

  const handlePortScreenClick = () => {
    navigate("/PortScreenChoice"); // Redirect to port screen coice page}
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

          <div className="col-md-7 p-4 ">
            {/* Right hand side section*/}
            <h3 className="mb-3 text-center">Portdisplaysystem</h3>
            <p className="text-muted text-center">välj ett alternativ</p>

            <div className="row-md-7 p-1 d-grid ">
              <button
                className="btn btn-success m-2"
                onClick={handlePortScreenClick}
              >
                Portskärm
              </button>
              <button
                className="btn btn-success m-2"
                onClick={handlePortScreenClick}
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
