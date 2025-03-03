import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import for receiving passed data
import supabase from "../Utilities/supabase.js"; // Supabase client for database operations

export default function PortDisplay() {
  const location = useLocation(); // Receiving passed data
  const { portNr } = location.state || {}; // Retrieve passed data

  // State to store retrieved data
  const [portInfo, setPortInfo] = useState(null);

  // Function to retrieve port info from Supabase
  const retrieveInfo = async () => {
    try {
      // Query Supabase to fetch port information
      const { data, error } = await supabase
        .from("Port_info")
        .select()
        .eq("port_nr", portNr);
      if (error) {
        console.error("Supabase query error:", error);
        return;
      }

      if (!data) {
        console.log("No data found for this port");
        return;
      }

      setPortInfo(data); // Store fetched data in state
      console.log("DATA IS:", data);
    } catch (error) {
      console.log("An error occurred while retrieving data:", error);
    }
  };

  // Automatically run `retrieveInfo` when page loads
  useEffect(() => {
    if (portNr) {
      retrieveInfo();
      console.log("getting info");
    }
  }, [portNr]);

  return (
    <div className="vh-100 d-flex flex-column">
      {/* Top Section */}
      <div
        className="bg-dark text-white d-flex align-items-center justify-content-center text-center"
        style={{ height: "20vh" }}
      >
        {/* Center both the logo and text */}
        <div className="d-flex align-items-center justify-content-center gap-3">
          {/* Logo */}
          <img
            src="/arla-logo.png"
            alt="Logo"
            className="img-fluid"
            style={{ maxWidth: "120px" }}
          />

          {/* Title */}
          <h1
            className="m-0 fw-bolder"
            style={{ fontSize: "calc(10vh + 2vw)", whiteSpace: "nowrap" }}
          >
            PORT {portNr}
          </h1>
        </div>
      </div>

      {/* Middle Section */}
      <div className="d-flex flex-grow-1 flex-row">
        <div className="container-fluid">
          <div className="row h-100 gap-2 justify-content-center">
            {/* Each div gets a shadow and modern styling */}
            <div className="col shadow-lg bg-white rounded-3 border border-light d-flex align-items-center justify-content-center p-4">
              <h2>Middle 1</h2>
            </div>
            <div className="col shadow-lg bg-white rounded-3 border border-light d-flex align-items-center justify-content-center p-4">
              <h2>Middle 2</h2>
            </div>
            <div className="col shadow-lg bg-white rounded-3 border border-light d-flex align-items-center justify-content-center p-4">
              <h2>Middle 3</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div
        className="bg-secondary text-white d-flex align-items-center justify-content-center"
        style={{ height: "20vh" }}
      >
        <h1
          className="w-100 display-1 m-5 fw-bold"
          style={{ fontSize: "calc(6vh + 2vw)", whiteSpace: "nowrap" }}
        >
          Bottom Section.
        </h1>
      </div>
    </div>
  );
}
