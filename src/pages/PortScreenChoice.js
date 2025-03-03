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
    <div className="middle-container ">
      <div className="container ">
        <div className="row g-5 ">
          {[...Array(nrOfPorts)].map((_, i) => (
            <div key={i} className="col-lg-3 col-md-4 col-sm-6 d-flex ">
              {/* Entire Card is a Clickable Button */}
              <button
                className="card port-card shadow-lg w-100 rounded-2  "
                onClick={() => portClickHndler(i + 1)}
              >
                <div className="card-body text-center ">
                  <h3 className="card-title"> {i + 1}</h3>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
