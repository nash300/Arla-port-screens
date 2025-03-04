import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // For receiving passed data
import supabase from "../Utilities/supabase.js"; // Supabase client
import RootNumber from "../components/RootNumber.js"; // Component to display root number

export default function PortDisplay() {
  const location = useLocation(); // Receiving passed data
  const { portNr } = location.state || {}; // Retrieve port number

  // State for fetched data
  const [portInfo, setPortInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Function to retrieve port info from Supabase
  const retrieveInfo = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      console.log(`Fetching data for port_nr: ${portNr}`); // Debugging log

      // Convert portNr to an integer
      const portNumber = parseInt(portNr, 10);
      if (isNaN(portNumber)) {
        console.error("Invalid port number:", portNr);
        setErrorMessage("Invalid port number.");
        setLoading(false);
        return;
      }

      // Supabase Query
      const { data, error } = await supabase
        .from("Port_info")
        .select("*") // Select all columns
        .eq("port_nr", portNumber) // Filter by port number
        .order("position", { ascending: true }); // Sort data

      if (error) {
        console.error("Supabase query error:", error);
        setErrorMessage("Error fetching port data.");
        setLoading(false);
        return;
      }

      if (!data || data.length === 0) {
        console.warn(`No data found for port_nr: ${portNumber}`);
        setErrorMessage(`No data available for Port ${portNumber}.`);
        setLoading(false);
        return;
      }

      console.log("Retrieved data:", data);
      setPortInfo(data); // Store fetched data
    } catch (error) {
      console.error("Unexpected error:", error);
      setErrorMessage("Failed to load port data.");
    } finally {
      setLoading(false);
    }
  };

  // Automatically run `retrieveInfo` when page loads
  useEffect(() => {
    if (portNr) {
      retrieveInfo();
    }
  }, [portNr]);

  return (
    <div className="vh-100 d-flex flex-column">
      {/* Header Section */}
      <div
        className="bg-dark text-white d-flex align-items-center justify-content-center text-center"
        style={{ height: "20vh" }}
      >
        <div className="d-flex align-items-center justify-content-center gap-3">
          <img
            src="/arla-logo.png"
            alt="Logo"
            className="img-fluid"
            style={{ maxWidth: "120px" }}
          />
          <h1
            className="m-0 fw-bolder"
            style={{ fontSize: "calc(10vh + 2vw)", whiteSpace: "nowrap" }}
          >
            PORT {portNr}
          </h1>
        </div>
      </div>

      {/* Middle Section */}
      <div className="d-flex flex-grow-1 flex-column justify-content-center">
        <div className="container-fluid h-100">
          <div className="row h-100 gap-2 justify-content-center">
            {loading ? (
              <div className="d-flex align-items-center justify-content-center w-100 h-100">
                <p>Loading data...</p>
              </div>
            ) : errorMessage ? (
              <div className="d-flex align-items-center justify-content-center w-100 h-100">
                <p className="text-danger">{errorMessage}</p>
              </div>
            ) : portInfo && portInfo.length === 0 ? (
              <div className="d-flex align-items-center justify-content-center w-100 h-100">
                <img src="/cow.png" alt="No data" className="img-fluid" />
              </div>
            ) : (
              portInfo.map((item, index) => (
                <div
                  key={index}
                  className="col shadow-lg bg-white rounded-3 border border-light d-flex align-items-center justify-content-center p-3"
                >
                  <RootNumber rootNr={item.root_nr} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section - Message Display */}
      {portInfo && portInfo.some((item) => item.msg !== null) && (
        <div
          className="bg-warning text-white d-flex align-items-center justify-content-center text-center position-relative"
          style={{ height: "15vh", overflow: "hidden" }}
        >
          <div>
            <h1
              className="blinking-text fw-bold text-black"
              style={{ fontSize: "calc(6vh + 2vw)", whiteSpace: "nowrap" }}
            >
              {portInfo.find((item) => item.msg)?.msg}
            </h1>
          </div>
          <img
            src="/running-cow.gif"
            alt="Running Cow"
            className="running-cow"
            style={{ maxWidth: "220px" }}
          />
        </div>
      )}

      {/* CSS Styles */}
      <style>
        {`
          /* Blinking Text Animation */
          @keyframes blinkEffect {
            0% { opacity: 0; }
            50% { opacity: 0.9; }
            100% { opacity: 1; }
          }
          .blinking-text {
            animation: blinkEffect 1.5s infinite ease-in-out;
          }

          /* Running Cow Animation */
          @keyframes moveCow {
            0% { left: -100px; }
            100% { left: 450%; }
          }
          .running-cow {
            position: absolute;
            bottom: 0;
            left: -150px;
            animation: moveCow 30s linear infinite;
          }
        `}
      </style>
    </div>
  );
}
