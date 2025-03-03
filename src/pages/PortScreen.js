import React from "react";
import "../App.css"; // Import custom styles

export default function PortScreen() {
  const nrOfPorts = 26; // Number of cards

  return (
    <div className="middle-container ">
      <div className="container ">
        <div className="row g-5 ">
          {[...Array(nrOfPorts)].map((_, i) => (
            <div key={i} className="col-lg-3 col-md-4 col-sm-6 d-flex ">
              {/* Entire Card is a Clickable Button */}
              <button
                className="card port-card shadow-lg w-100 rounded-pill  "
                onClick={() => alert(`Port ${i + 1} Selected`)} // TO-DO
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
