import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

export default function ChangeUpdatePage() {
  // State for form inputs
  const [selectedNumber, setSelectedNumber] = useState("");
  const [leftRoute, setLeftRoute] = useState("");
  const [middleRoute, setMiddleRoute] = useState("");
  const [rightRoute, setRightRoute] = useState("");
  const [message, setMessage] = useState(""); // State for text area input
  const [selectedHours, setSelectedHours] = useState(""); // Hours selection
  const [selectedMinutes, setSelectedMinutes] = useState(""); // Minutes selection

  // Generate hour options (0 - 5)
  const hourOptions = Array.from({ length: 6 }, (_, i) => i);
  // Minute options (0 or 30 mins)
  const minuteOptions = [15, 30, 45];

  // Handle text area change with character limit (30 characters)
  const handleTextChange = (e) => {
    if (e.target.value.length <= 30) {
      setMessage(e.target.value);
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Port Number:", selectedNumber);
    console.log("Routes:", { leftRoute, middleRoute, rightRoute });
    console.log("Message:", message);
    console.log(
      "Time Limit:",
      selectedHours + " hours",
      selectedMinutes + " minutes"
    );
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="bg-white shadow-lg rounded-4 p-5 border border-3 border-success w-50 mx-auto"
        style={{ maxWidth: "600px", minWidth: "300px" }}
      >
        {/* Logo Section - Centered */}
        <div className="d-flex justify-content-center mb-3">
          <img
            src="/arla-logo.png"
            alt="Logo"
            className="img-fluid"
            style={{ maxWidth: "100px" }}
          />
        </div>

        {/* Form Header - Centered */}
        <h2 className="text-center text-success fw-bold mb-4 border-bottom pb-2">
          Ändra / Uppdatera Information
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Dropdown Menu */}
          <div className="mb-4 text-center border p-3 rounded">
            <label className="form-label fw-bold text-dark">
              Välj portnumret:
            </label>
            <select
              value={selectedNumber}
              onChange={(e) => setSelectedNumber(e.target.value)}
              className="form-select border border-success text-dark p-2 mx-auto"
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

          {/* Port Selection Area */}
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
                  onChange={(e) => setLeftRoute(e.target.value)}
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
                  onChange={(e) => setMiddleRoute(e.target.value)}
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
                  onChange={(e) => setRightRoute(e.target.value)}
                  className="form-control border border-success text-dark text-center"
                />
              </div>
            </div>
          </div>

          {/* Time Limit Selection */}
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
                <option value="">Timmar</option>
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
                <option value="">Minuter</option>
                {minuteOptions.map((minute) => (
                  <option key={minute} value={minute}>
                    {minute} min
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Message Text Area */}
          <div className="mb-4 text-center border p-3 rounded">
            <label className="form-label fw-bold text-dark">
              Ange ett meddelande (max 30 tecken):
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

          {/* Submit Button */}
          <button type="submit" className="btn btn-success w-100 fw-bold p-2">
            Uppdatera
          </button>
        </form>
      </div>
    </div>
  );
}
