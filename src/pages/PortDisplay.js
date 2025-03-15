import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import supabase from "../Utilities/supabase.js";
import RootNumber from "../components/RootNumber.js";
import arla_logo from "../images/arla-logo.png";
import arla_logo_cow from "../images/cow.png";

export default function PortDisplay() {
  const location = useLocation();
  const { portNr } = location.state || {};

  const [portInfo, setPortInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchPortData = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const portNumber = parseInt(portNr, 10);
      if (isNaN(portNumber)) {
        setErrorMessage("Invalid port number.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("Port_info")
        .select("*")
        .eq("port_nr", portNumber);

      if (error) {
        setErrorMessage("Error fetching port data.");
      } else {
        setPortInfo(data.length > 0 ? data[0] : null); // Now handling a single object
      }
    } catch (error) {
      setErrorMessage("Failed to load port data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (portNr) {
      fetchPortData();
    }
  }, [portNr]);

  useEffect(() => {
    const channel = supabase
      .channel("realtime-ports")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Port_info" },
        () => {
          fetchPortData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="vh-100 vw-100 d-flex flex-column overflow-hidden">
      {/* 🔹 Header Section */}
      <div
        className="bg-dark text-white d-flex align-items-center justify-content-center text-center"
        style={{ height: "20vh" }}
      >
        <div className="d-flex align-items-center gap-3">
          <img
            src={arla_logo}
            alt="Logo"
            className="img-fluid"
            style={{ maxWidth: "120px" }}
          />
          <h1
            className="m-0 fw-bolder"
            style={{ fontSize: "calc(8vh + 2vw)", whiteSpace: "nowrap" }}
          >
            PORT {portNr}
          </h1>
        </div>
      </div>

      {/* 🔹 Middle Section - 3 Fixed Sections */}
      <div className="flex-grow-1 d-flex justify-content-center align-items-center overflow-hidden">
        <div className="container-fluid h-100">
          <div className="row h-100 align-items-center">
            {loading ? (
              <div className="d-flex align-items-center justify-content-center w-100 h-100">
                <p className="display-3 fw-bold text-muted">Loading data...</p>
              </div>
            ) : (
              <div className="row w-100 h-100 p-3">
                {/* Left Section */}
                <div className="col d-flex flex-column align-items-center justify-content-center">
                  <h1 className="position-heading w-100 text-center text-warning">
                    VÄNSTER
                  </h1>
                  <RootNumber rootNr={portInfo?.pos_left} />
                </div>

                {/* Middle Section */}
                <div className="col d-flex flex-column align-items-center justify-content-center">
                  <h1 className="position-heading w-100 text-center text-warning">
                    MITTEN
                  </h1>
                  <RootNumber rootNr={portInfo?.pos_middle} />
                </div>

                {/* Right Section */}
                <div className="col d-flex flex-column align-items-center justify-content-center">
                  <h1 className="position-heading w-100 text-center text-warning">
                    HÖGER
                  </h1>
                  <RootNumber rootNr={portInfo?.pos_right} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🔹 Bottom Section */}
      {portInfo && portInfo.msg && (
        <div
          className="bg-warning text-black d-flex align-items-center justify-content-center text-center position-relative"
          style={{ height: "15vh" }}
        >
          <h1
            className="blinking-text fw-bold"
            style={{ fontSize: "calc(6vh + 2vw)", whiteSpace: "nowrap" }}
          >
            {portInfo.msg}
          </h1>
        </div>
      )}

      {/* 🔹 Blinking Effect */}
      <style>
        {`
          @keyframes blinkEffect {
            0% { opacity: 0; }
            50% { opacity: 0.9; }
            100% { opacity: 1; }
          }
          .blinking-text {
            animation: blinkEffect 1.5s infinite ease-in-out;
          }

          /* Position Heading */
          .position-heading {
            font-size: 5vh;
            font-weight: bold;
            padding: 10px 20px;
            border-radius: 8px;
            background: linear-gradient(135deg, rgb(10, 42, 17), rgb(9, 50, 19));
            text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
            margin-bottom: 15px;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
            display: inline-block;
          }
        `}
      </style>
    </div>
  );
}
