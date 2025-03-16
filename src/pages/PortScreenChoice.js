/* //////////////////////////////////////////////////////////////////////////////////// 
PURPOSE:
An interface for the user to select the port screen to be displayed.

FUNCTIONALITY:
* list all port display screen items in the screen.
* The display screen choosen here will remain in the display screen of the given port.
* The port displays that are currently in use is displayed in different colour.
/////////////////////////////////////////////////////////////////////////////////////*/

import { useNavigate } from "react-router-dom";
import supabase from "../Utilities/supabase.js"; // Supabase client for database queries
import React, { useEffect, useState } from "react";

export default function PortScreenChoice() {
  const nrOfPorts = 26; // Number of ports. Update here if the nr of displays are changed.
  const navigate = useNavigate(); // Hook for navigation
  const [portList, setPortList] = useState([]); // (from database) - retrieved list of ports that are currently in use.

  // Fetch data when component mounts_______________________________________________
  // retrieves a list of ports that are currently in use and stores in portList hook
  useEffect(() => {
    const fetchPortData = async () => {
      try {
        console.log(`Fetching all data from Supabase`);

        // Query Supabase for port data
        const { data, error } = await supabase
          .from("Port_info")
          .select("port_nr");

        if (error) {
          console.error("Supabase query error:", error);
        } else {
          console.log("Updated data received:", data);

          // Convert port numbers to integers before storing
          setPortList(data.map((item) => parseInt(item.port_nr, 10)));
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchPortData(); // Run when component mounts
  }, []); // Empty dependency array = runs once when mounted
  //-------------------------------------------------------------------------->>>

  // Handle function for port screen click _________
  // re-direct the user to the choosen port screen
  const portClickHandler = (portNumber) => {
    navigate("/PortDisplay", {
      state: {
        portNr: portNumber,
      },
    });
  };
  //--------------------------------------------->>>

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      {/**************  Heading section ****************/}
      <div className="text-center mb-4">
        <h2 className=" ">Portskärm</h2>
        <hr />
      </div>

      {/**************  Port screen list section  ****************/}
      <div className="row g-3 justify-content-center">
        {[...Array(nrOfPorts)].map((_, i) => {
          const portNumber = i + 1;
          const isHighlighted = portList.includes(portNumber); // Check if port is in portList

          return (
            <div key={portNumber} className="col-lg-2 col-md-3 col-sm-4">
              <button
                className={`btn w-100 p-3 shadow rounded fw-bold ${
                  isHighlighted
                    ? "bg-warning text-dark" // If the port screen is currently in use
                    : "bg-success text-white" // If the port screen is currently NOT in use
                }`}
                onClick={() => portClickHandler(portNumber)}
              >
                Port {portNumber}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
