import React from "react";
import { useLocation } from "react-router-dom"; // Import for receiving passed data

export default function PortDisplay() {
  const location = useLocation(); // ✅ Get state from navigation
  const { portNr } = location.state || {}; // Retrieve passed data

  return (
    <div className="container text-center mt-5">
      <h1>Port Display Selection</h1>
      <p>
        <strong>Selected Option:</strong> {portNr || "No option selected"}
      </p>
    </div>
  );
}
