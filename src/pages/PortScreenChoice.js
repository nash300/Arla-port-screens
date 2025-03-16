import React from "react";
import "../App.css"; // Import custom styles
import { useNavigate } from "react-router-dom";

export default function PortScreenChoice() {
  const nrOfPorts = 26; // Number of ports
  const navigate = useNavigate(); // Hook for navigation

  const portClickHndler = (portNumber) => {
    navigate("/PortDisplay", {
      state: {
        portNr: portNumber,
      },
    });
  };

  return (
    <div className="middle-container d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="container text-center m-3 p-3 vh-100">
        <h2 className="title-text mb-4">Välj Port</h2>
        <hr/>

        <div className="row g-3 justify-content-center">
          {[...Array(nrOfPorts)].map((_, i) => (
            <div key={i} className="col-lg-2 col-md-3 col-sm-4 d-flex">
              {/* Entire Card is a Clickable Button */}
              <button
                className="card port-card"
                onClick={() => portClickHndler(i + 1)}
              >
                <div className="card-body d-flex align-items-center justify-content-center">
                  <h3 className="card-title">Port {i + 1}</h3>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          /* Full Screen Centered Container */
          .middle-container {
            background: linear-gradient(to right, #f8f9fa, #e9ecef); /* Light professional gradient */
            padding: 20px;
          }

          /* Title Text */
          .title-text {
            font-size: 24px;
            font-weight: bold;
            color: #333;
          }

          /* Port Selection Card Styling */
          .port-card {
            width: 100%;
            height: 100px;
            background: #198754; /* Bootstrap success green */
            color: white;
            font-weight: bold;
            border: none;
            border-radius: 10px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease-in-out;
          }

          /* Hover Effect */
          .port-card:hover {
            background: #146c43; /* Darker green on hover */
            transform: translateY(-5px); /* Slight lift effect */
            box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
          }

          /* Card Text */
          .card-title {
            font-size: 24px;
            font-weight: bold;
          }
        `}
      </style>
    </div>
  );
}
