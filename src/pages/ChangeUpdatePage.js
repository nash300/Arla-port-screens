/* /////////////////////////////////////////////////////////////////////////////// 
PURPOSE:
An interface for the user to add/change data that are shown in the port screens.

FUNCTIONALITY:
* Collect and store information for the ports from user.
* Retrieve data (port number) of the currently used port displays.
* Provide an option to reset/clear a port display.
* Remove/Clear currently stored data for the selected port before updating.
* Update the database (Port_info)
////////////////////////////////////////////////////////////////////////////////*/

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import supabase from "../Utilities/supabase";
import { useNavigate } from "react-router-dom";

export default function ChangeUpdatePage() {
  // State for form inputs_____________________________________________________________________________
  const [selectedPortNumber, setSelectedPortNumber] = useState("");
  const [leftRoute, setLeftRoute] = useState(""); // (Input)-left route to the database table.
  const [middleRoute, setMiddleRoute] = useState(""); // (Input)-middle route to the database table.
  const [rightRoute, setRightRoute] = useState(""); // (Input)-right route to the database table.
  const [message, setMessage] = useState(""); // (Input)- text area input
  const [selectedHours, setSelectedHours] = useState(1); // (Input)-Hours selection
  const [selectedMinutes, setSelectedMinutes] = useState(0); // (Input)-Minutes selection
  const [portList, setPortList] = useState([]); // (From database)- the ports that currently are in use

  // Remove a port from the portList_______________________________
  // This is used to remove a port from the local copy of-
  //  the portList as you delete it's record in the database.______
  const removePort = (portToRemove) => {
    setPortList((prevPortList) =>
      prevPortList.filter((port) => port !== Number(portToRemove))
    );
  };


  //_________________________________________________________
  // Generate hour options (0 - 5)
  // Used in (nr of hours) drop down list.___________________
  const hourOptions = Array.from({ length: 6 }, (_, i) => i);

  //____________________________________________
  // Minute options (0 or 30 mins)
  // Used in |nr of hours| drop down list_______
  const minuteOptions = [0, 1, 15, 30, 45];

  //________________________________________________________________________
  // Summing up the number of hours and minutes into minutes
  // The output will be saved in the database.______________________________
  const minuteCounter = (selectedHours, selectedMinutes) => {
    return 60 * parseInt(selectedHours, 10) + parseInt(selectedMinutes, 10);
  };
  const totalMinutes = minuteCounter(selectedHours, selectedMinutes);

  //_________________________________________________________
  // Hook for navigation
  // Re direct the page to the newly update port screen______
  const navigate = useNavigate();
  const portToRedirect = selectedPortNumber;
  const directToPortScreen = (userSelectedPortNr) => {
    navigate("/PortDisplay", {
      state: {
        portNr: userSelectedPortNr,
      },
    });
  };

  //_______________________________________
  // Handle text area change
  // character limit (30 characters)_______
  const handleTextChange = (e) => {
    if (e.target.value.length <= 30) {
      setMessage(e.target.value);
    }
  };

  //_____________________________________________________________
  // Fetch port data when component mounts
  // Used to retrieve and store the ports that-
  // are in use to the PortList hook.____________________________
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

  //______________________________________________________________________
  // Function to handle form submission
  // * Does some input validations.
  // * Checks if there already exists data for the selected port.
  // * If it does, delete them.
  // * Send the data to the data base from the states.
  // * Reset form fields after successful submission.
  // * Navigate to the port screen with the saved port number_____________
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Atleast 1 port selected?
    if (!selectedPortNumber) {
      alert("Välj ett portnummer!");
      return;
    }

    // Atleast 1 route number selected?
    if (!(leftRoute || middleRoute || rightRoute)) {
      alert("Välj minst ett ruttnummer!");
      return;
    }

    // Atleast 1 route number selected?
    if (totalMinutes <= 0) {
      alert("Tidgräns kan inte vara 0!");
      return;
    }

    // If there are old data, remove them before update
    const { data: oldData, error: err } = await supabase
      .from("Port_info")
      .select("*")
      .eq("port_nr", selectedPortNumber);

    if (err) {
      console.error("Error fetching data:", err);
    } else if (oldData.length > 0) {
      // Records found → Proceed to delete
      const { error: deleteError } = await supabase
        .from("Port_info")
        .delete()
        .eq("port_nr", selectedPortNumber);

      if (deleteError) {
        console.error("Error deleting records:", deleteError);
      } else {
        console.log("Records deleted successfully.");
      }
    } else {
      console.log("No records found for port number:", selectedPortNumber);
    }

    // Insert data into Supabase
    const { data, error } = await supabase.from("Port_info").insert([
      {
        port_nr: selectedPortNumber,
        pos_left: leftRoute,
        pos_middle: middleRoute,
        pos_right: rightRoute,
        time_limit: totalMinutes, // Store time in minutes
        msg: message || null, // Allow null if message is empty
      },
    ]);
    if (error) {
      console.error("Fel vid insättning i databasen:", error);
      alert("Ett fel uppstod vid uppdatering av databasen.");
    } else {
      console.log("Inlagt i databasen:", data);

      // Reset form fields after successful submission
      setSelectedPortNumber("");
      setLeftRoute("");
      setMiddleRoute("");
      setRightRoute("");
      setSelectedHours(1);
      setSelectedMinutes(0);
      setMessage("");
      // Navigate to the port screen with the saved port number
      directToPortScreen(portToRedirect);
    }
  };

  //____________________________________________________________________________________________
  // Delete button handle functions
  // (This button renders only if there are existing data for the choosen port in the database)
  // * Delete data for the choosen port from the database
  // * Reset selected port______________________________________________________________________
  const handleDeleteButton = async () => {
    const confirmDelete = window.confirm(
      "Är du säker på att du vill återställa denna skärm?"
    );
    if (!confirmDelete) return;

    try {
      const { error } = await supabase
        .from("Port_info")
        .delete()
        .eq("port_nr", selectedPortNumber);

      if (error) {
        console.error("Error deleting record:", error);
        alert("Kunde inte radera posten.");
      } else {
        alert("Portdisplayen har återställts");
        removePort(selectedPortNumber); // removes the port from the ports in use state
        setSelectedPortNumber(""); // Reset selected port
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="bg-white shadow-lg rounded-4 p-5 border border-3 border-success w-50 mx-auto"
        style={{ maxWidth: "600px", minWidth: "300px" }}
      >
        {/************************* Logo Section  **********************************/}
        <div className="d-flex justify-content-center mb-3">
          <img
            src="/arla-logo.png"
            alt="Logo"
            className="img-fluid"
            style={{ maxWidth: "100px" }}
          />
        </div>

        {/************* Form Header  ****************/}
        <h2 className="text-center text-success fw-bold mb-4 border-bottom pb-2">
          Ändra / Uppdatera Information
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* ***********************  Välj portnumret  ******************************/}
          <div className="border bg-success bg-opacity-25 mb-4 text-center p-3 rounded">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex flex-column">
                {/* Dropdown Menu */}

                <label className="form-label fw-bold text-dark text-start">
                  Välj portnumret:
                </label>
                <select
                  value={selectedPortNumber}
                  onChange={(e) => setSelectedPortNumber(e.target.value)}
                  className="form-select border border-success text-dark p-2"
                  style={{ maxWidth: "300px", minWidth: "150px" }}
                >
                  <option value="">Port</option>
                  {Array.from({ length: 26 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              {/* Delete Button */}
              {/* appears only the database has records for the choosen port number */}
              {portList.includes(Number(selectedPortNumber)) ? (
                <button
                  type="button"
                  onClick={handleDeleteButton}
                  className="btn btn-danger ms-3 fw-bold p-2"
                >
                  Återställ port {selectedPortNumber}
                </button>
              ) : null}
            </div>
          </div>

          {/******************************* Ange ruttnummer *********************************/}
          <div className="mb-4 border p-3 rounded">
            <label className="form-label fw-bold text-dark d-block text-center mb-3">
              Ange ruttnummer:
            </label>

            <div className="row g-3 text-center">
              {/* Left Column */}
              <div className="col-12 col-md-4">
                <h5 className="text-success fw-bold border-bottom pb-1">
                  Vänster
                </h5>
                <input
                  type="text"
                  value={leftRoute}
                  onChange={(e) => setLeftRoute(e.target.value.toUpperCase())}
                  className="form-control border border-success text-dark text-center"
                />
              </div>

              {/* Middle Column */}
              <div className="col-12 col-md-4">
                <h5 className="text-success fw-bold border-bottom pb-1">
                  Mitten
                </h5>
                <input
                  type="text"
                  value={middleRoute}
                  onChange={(e) => setMiddleRoute(e.target.value.toUpperCase())}
                  className="form-control border border-success text-dark text-center"
                />
              </div>

              {/* Right Column */}
              <div className="col-12 col-md-4">
                <h5 className="text-success fw-bold border-bottom pb-1">
                  Höger
                </h5>
                <input
                  type="text"
                  value={rightRoute}
                  onChange={(e) => setRightRoute(e.target.value.toUpperCase())}
                  className="form-control border border-success text-dark text-center"
                />
              </div>
            </div>
          </div>

          {/*******************************  Välj tidsgräns ************************************/}
          <div className="mb-4 text-center border p-3 rounded">
            <label className="form-label fw-bold text-dark">
              Välj tidsgräns (max 5 timmar):
            </label>
            <div className="d-flex justify-content-center gap-3">
              {/* Hours Dropdown */}
              <select
                value={selectedHours}
                onChange={(e) => setSelectedHours(e.target.value)}
                className="form-select border border-success text-dark p-2"
                style={{ maxWidth: "150px", minWidth: "100px" }}
              >
                {hourOptions.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour} {hour === 1 ? "timme" : "timmar"}
                  </option>
                ))}
              </select>

              {/* Minutes Dropdown */}
              <select
                value={selectedMinutes}
                onChange={(e) => setSelectedMinutes(e.target.value)}
                className="form-select border border-success text-dark p-2"
                style={{ maxWidth: "150px", minWidth: "100px" }}
              >
                {minuteOptions.map((minute) => (
                  <option key={minute} value={minute}>
                    {minute} min
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/*************************** Meddelande  *********************************/}
          <div className="mb-4 text-center border p-3 rounded">
            <label className="form-label fw-bold text-dark">
              Meddelande (max 30 tecken):
            </label>
            <textarea
              value={message}
              onChange={handleTextChange}
              className="form-control border border-success text-dark mx-auto text-center"
              rows="1"
              maxLength="30"
              style={{ width: "100%", maxWidth: "300px", minWidth: "150px" }}
            />
            <small className="text-muted d-block mt-1">
              {30 - message.length} tecken kvar
            </small>
          </div>

          {/****************** Submit Button ********************************/}
          <button type="submit" className="btn btn-success w-100 fw-bold p-2">
            Uppdatera
          </button>
        </form>
      </div>
    </div>
  );
}
