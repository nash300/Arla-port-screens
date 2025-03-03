import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom"; // Import for receiving passed data
import supabase from "../Utilities/supabase.js"; // Supabase client for database operations
import RootNumber from "../components/RootNumber.js";

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
        .eq("port_nr", portNr)
        .order("position", { accending: true });
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
      {/* Middle Section ----------------------------------------------------------------------*/}
      <div className="d-flex flex-grow-1 flex-col">
        <div className="container-fluid">
          <div className="row h-100  gap-2 justify-content-center">
            {(portInfo || []).map((item, index) => (
              <div
                key={index}
                className="col shadow-lg bg-white rounded-3 border border-light d-flex align-items-center justify-content-center p-3"
              >
                <RootNumber rootNr={item.root_nr} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Bottom Section ------------------------------------------------------------------------*/}
      <div
        className="bg-warning text-white d-flex align-items-center justify-content-center text-center position-relative"
        style={{ height: "15vh", overflow: "hidden" }}
      >
        {/* Main Content */}
        <div>
          <h1
            className="blinking-text fw-bold text-black"
            style={{ fontSize: "calc(6vh + 2vw)", whiteSpace: "nowrap" }}
          >
            G53 till torget
          </h1>
        </div>

        {/* Running Cow */}
        <img
          src="/running-cow.gif"
          alt="Running Cow"
          className="running-cow"
          style={{ maxWidth: "220px" }}
        />

        {/* CSS Animation */}
        <style>
          {`
          /* Blinking Text Animation */
          @keyframes blinkEffect {
            0% { opacity: 0.1; }
            50% { opacity: 0.9; }
            100% { opacity: 1; }
          }

          .blinking-text {
            animation: blinkEffect 2s infinite ease-in-out;
          }

          /* Running Cow Animation */
          @keyframes moveCow {
            0% { left: -150px; }  /* Start off-screen (left) */
            100% { left: 100%; }   /* Move to off-screen (right) */
          }

          .running-cow {
            position: absolute;
            bottom: 0; /* Keeps it at the bottom */
            left: -150px; /* Start position */
            animation: moveCow 6s linear infinite; /* Adjust speed as needed */
          }
        `}
        </style>
      </div>
    </div>
  );
}
