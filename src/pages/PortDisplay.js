/* ////////////////////////////////////////////////////////////////////////////////////////// 
PURPOSE:
This is the page that the display screen shows.

PARAMETERS 


FUNCTIONALITY:
* retrieves information to be displayed for the corresponding screen
* Commiunicating with the database to get real-time change alerts to the table.
* If no records for the screen are present in the database, outputs an image (default image)
///////////////////////////////////////////////////////////////////////////////////////////*/

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Hook to access the passed data (port number)
import supabase from "../Utilities/supabase.js"; // Supabase client for database queries
import RootNumber from "../components/RootNumber.js"; // Component to display the root number

export default function PortDisplay() {
  // initializing location object & Retrieve port number from the previous page
  const location = useLocation();
  const portNr = Number(location.state?.portNr); // Retrieve port number from the previous page

  //__________________________________________________________________________________
  // State to store port information__________________________________________________
  const [portInfo, setPortInfo] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading status indicator
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  //____________________________________________________
  // Inline styles for the rotation animation
  // Used to animate the default screen image___________
  const rotatingStyle = {
    animation: "rotateY360 6s ease-in-out infinite",
    transformStyle: "preserve-3d",
    width: "600px", // Adjust size as needed
  };

  //________________________________________________________________________________
  // Fetches port information from Supabase based on the port number
  // If no data is found, it updates the state accordingly._________________________
  const fetchPortData = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      console.log(`Fetching data for port_nr: ${portNr}`);

      // Validate portNr
      if (!portNr || isNaN(portNr)) {
        setErrorMessage("Invalid port number.");
        setLoading(false);
        return;
      }

      // Query Supabase for port data
      const { data, error } = await supabase
        .from("Port_info")
        .select("*")
        .eq("port_nr", portNr);

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

  //_________________________________________________________________
  // Fetch port data when the component mounts or-
  // when portNr changes_____________________________________________
  useEffect(() => {
    if (portNr) {
      fetchPortData();
    }
  }, [portNr]);

  //_________________________________________________________________________
  // Subscribe to real-time Supabase updates to listen-
  // for changes in the "Port_info" table____________________________________
  useEffect(() => {
    // Check if `portNr` is valid before proceeding
    // - If `portNr` is undefined, null, or NaN, exit early (prevent unnecessary subscription)
    if (!portNr || isNaN(portNr)) return; // Prevent subscribing with invalid portNr

    // Create a Supabase real-time channel (subscription)
    // - The channel listens for changes in the `Port_info` table
    const channel = supabase
      .channel("realtime-ports") // // Create a unique channel for listening to port updates
      .on(
        "postgres_changes", // Listen for database changes
        { event: "*", schema: "public", table: "Port_info" },
        (payload) => {
          // Callback function runs when a change occurs
          console.log("Database change detected:", payload);
          fetchPortData(); // Re-fetch latest data when a change occurs
        }
      )
      .subscribe(); // Subscribe to real-time changes

    // Cleanup function to run when the component unmounts (or when `portNr` changes)
    // - This prevents memory leaks by unsubscribing from the Supabase channel
    return () => {
      supabase.removeChannel(channel);
    };
  }, [portNr]); // Re-run this effect whenever `portNr` changes

  return (
    <div className="vh-100 d-flex flex-column">
      {/*************************** Header Section ***************************/}
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

      {/********************* Middle Section - Displays port information **************/}
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
                {/* Rotating Image */}
                <img
                  src="/cow.png"
                  alt="No data"
                  className="img-fluid"
                  style={rotatingStyle}
                />

                {/* Adding the keyframes inside a <style> tag to animate the default screen image */}
                <style>
                  {`
          @keyframes rotateY360 {
            from {
              transform: rotateY(0deg);
            }
            to {
              transform: rotateY(360deg);
            }
          }
        `}
                </style>
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

      {/*********** Bottom Section - Message Display (only shown if any portInfo item has a message) **********/}
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
