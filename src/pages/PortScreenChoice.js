import { useNavigate } from "react-router-dom";
import supabase from "../Utilities/supabase.js"; // Supabase client for database queries
import React, { useEffect, useState } from "react";

export default function PortScreenChoice() {
  const nrOfPorts = 26; // Number of ports
  const navigate = useNavigate(); // Hook for navigation
  const [portList, setPortList] = useState([]);

  // Fetch data when component mounts
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

  const portClickHandler = (portNumber) => {
    navigate("/PortDisplay", {
      state: {
        portNr: portNumber,
      },
    });
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <div className="text-center mb-4">
        <h2 className=" ">Portskärm</h2>
        <hr />
      </div>

      <div className="row g-3 justify-content-center">
        {[...Array(nrOfPorts)].map((_, i) => {
          const portNumber = i + 1;
          const isHighlighted = portList.includes(portNumber); // Check if port is in portList

          return (
            <div key={portNumber} className="col-lg-2 col-md-3 col-sm-4">
              {/* Entire Card is a Clickable Button */}
              <button
                className={`btn w-100 p-3 shadow rounded fw-bold ${
                  isHighlighted
                    ? "bg-warning text-dark"
                    : "bg-success text-white"
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
