import { useNavigate } from "react-router-dom";
import supabase from "../Utilities/supabase.js"; // Supabase client for database queries
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

export default function PortScreenChoice() {
  const nrOfPorts = 26; // Number of ports. Update here if the nr of displays are changed.
  const navigate = useNavigate(); // Hook for navigation
  const [portList, setPortList] = useState([]); // (from database) - retrieved list of ports that are currently in use.

  // Fetch data when component mounts
  // retrieves a list of ports that are currently in use and
  // stores in portList hook
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
          setPortList(data.map((item) => parseInt(item.port_nr, 10))); // Convert port numbers to integers before storing
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchPortData(); // Run when component mounts
  }, []); // Empty dependency array = runs once when mounted

  // Handle function for port screen click
  // re-direct the user to the chosen port screen
  const portClickHandler = (portNumber) => {
    navigate("/PortDisplay", {
      state: {
        portNr: portNumber,
      },
    });
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
    

      {/* Port screen list section */}
      <div className="row g-4 justify-content-center">
        {[...Array(nrOfPorts)].map((_, i) => {
          const portNumber = i + 1;
          const isHighlighted = portList.includes(portNumber); // Check if port is in portList

          return (
            <div key={portNumber} className=" col-lg-2 col-md-3 col-sm-4">
              <div
                className={`card border-dark  border-0 ${
                  isHighlighted
                    ? "bg-warning text-dark "
                    : "bg-secondary text-white"
                }`}
                style={{ cursor: "pointer", transition: "transform 0.2s" }}
                onClick={() => portClickHandler(portNumber)}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <div className="card-body  justify-content-center align-items-center  text-center">
                  <h5>Port {portNumber}</h5>
                  <p className="card-text ">{isHighlighted ? "🖥️" : "🖥️"}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
