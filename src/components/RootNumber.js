/* /////////////////////////////////////////////////////////////////////////////// 
PURPOSE:
This is a custom component to display the route numbers.

PARAMETERS:
rootNr | an string that representate a route number.

FUNCTIONALITY:
* Reading the in comming parameter (route number) and display it with CSS styling.
* Ignores the space if no in-parameter is present.
////////////////////////////////////////////////////////////////////////////////*/

import React from "react";

const RootNumber = ({ rootNr }) => {
  // If rootNr is not provided, return nothing (empty div)
  if (!rootNr) return <div></div>;

  return (
    <div className="root-number bg-success bg-gradient">
      <p className="shiny-text">{rootNr}</p>

      {/* CSS Styling */}
      <style>
        {`
          /* Container with 3D Effect */
          .root-number {
            width: 100%;
            height: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20vh; /* Large text */
            font-weight: bold;
            text-align: center;
            margin-left: 10px;
            margin-right: 10px;

            border-radius: 15px; /* More rounded corners */
            background: linear-gradient(145deg, #28a745, #1e7e34); /* Gradient for 3D effect */
            box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.4), /* Outer shadow */
                        inset -5px -5px 10px rgba(255, 255, 255, 0.2), /* Inner glow */
                        inset 5px 5px 10px rgba(0, 0, 0, 0.3); /* Inner shadow */
            transition: transform 0.2s ease-in-out; /* Smooth hover effect */
          }

          /* Improved Text Shadow Effect */
          .shiny-text {
            color: white;
            text-shadow: 
              2px 2px 5px rgba(0, 0, 0, 0.8), /* Dark shadow for depth */
              0px 0px 10px rgba(255, 255, 255, 0.6); /* Soft glow */
          }
        `}
      </style>
    </div>
  );
};

export default RootNumber;
