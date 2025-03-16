import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Hook to access the passed data (port number)
import supabase from "../Utilities/supabase.js"; // Supabase client for database queries
import RootNumber from "../components/RootNumber.js"; // Component to display the root number

export default function PortDisplay() {
  const location = useLocation();
  const { portNr } = location.state || {}; // Retrieve port number from the previous page

  // State to store port information
  const [portInfo, setPortInfo] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  /**
   * Fetches port information from Supabase based on the port number.
   * If no data is found, it updates the state accordingly.
   */
  const fetchPortData = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      console.log(`Fetching data for port_nr: ${portNr}`);

      // Convert port number to integer
      const portNumber = parseInt(portNr, 10);
      if (isNaN(portNumber)) {
        setErrorMessage("Invalid port number.");
        setLoading(false);
        return;
      }

      // Query Supabase for port data
      const { data, error } = await supabase
        .from("Port_info")
        .select("*")
        .eq("port_nr", portNumber);

      if (error) {
        console.error("Supabase query error:", error);
        setErrorMessage("Error fetching port data.");
      } else {
        console.log("Updated data received:", data);
        setPortInfo(data.length > 0 ? data : null); // Update state with fetched data

        // If no items have a message, ensure the message section disappears
        if (!data.some((item) => item.msg)) {
          setPortInfo((prev) => prev?.map((item) => ({ ...item, msg: null })));
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setErrorMessage("Failed to load port data.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch port data when the component mounts or when portNr changes
  useEffect(() => {
    if (portNr) {
      fetchPortData();
    }
  }, [portNr]);

  // Subscribe to real-time Supabase updates to listen for changes in the "Port_info" table
  useEffect(() => {
    const channel = supabase
      .channel("realtime-ports") // Create a real-time channel
      .on(
        "postgres_changes", // Listen for any database changes
        { event: "*", schema: "public", table: "Port_info" },
        (payload) => {
          console.log("Database change detected:", payload);
          fetchPortData(); // Re-fetch latest data when changes occur
        }
      )
      .subscribe();

    // Cleanup function to unsubscribe when the component unmounts
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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

      {/* Middle Section - Displays port information */}
      <div className="d-flex flex-grow-1 justify-content-center">
        <div className="container-fluid h-100">
          <div className="row h-100 gap-2 justify-content-center">
            {loading ? (
              // Show loading text while fetching data
              <div className="d-flex align-items-center  justify-content-center w-100 h-100">
                <p>Loading data...</p>
              </div>
            ) : !portInfo ? (
              // Show an image when no data is found
              <div className="d-flex align-items-center justify-content-center w-100 h-100">
                <img src="/cow.png" alt="No data" className="img-fluid" />
              </div>
            ) : (
              // Display each item in portInfo array
              portInfo.map((item, index) => (
                <div key={index} className="row  ">
                  {[
                    { label: "VÄNSTER", value: item.pos_left },
                    { label: "MITTEN", value: item.pos_middle },
                    { label: "HÖGER", value: item.pos_right },
                  ].map(({ label, value }, idx) => (
                    <div key={idx} className="col-4 d-flex flex-column  p-2">
                      {/* Heading with Fixed Height */}
                      <div
                        className="bg-dark text-white p-3 rounded-top text-center  fw-bold d-flex align-items-center justify-content-center"
                        style={{
                          fontSize: "clamp(1rem, 5vw, 2rem)",
                          minHeight: "60px",
                        }}
                      >
                        {label}
                      </div>

                      {/* Content Box with Equal Height */}
                      <div className="bg-light shadow p-3 mb-5 bg-body rounded rounded-bottom text-center  flex-grow-1 d-flex align-items-center justify-content-center h-100">
                        {value !== undefined ? (
                          <RootNumber rootNr={value} />
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section - Message Display (only shown if any portInfo item has a message) */}
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
              {/* Show first message found */}
            </h1>
          </div>
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
        `}
      </style>
    </div>
  );
}
