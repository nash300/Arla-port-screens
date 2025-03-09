import React from "react";

const RootNumber = ({ rootNr }) => {
  return (
    <div className="root-number bg-dark bg-gradient">
      <p className="shiny-text">{rootNr}</p>

      <style>
        {`
          /* Container */
          .root-number {
            width: 100%;
            height: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20vh; /* Large text */
            font-weight: bold;
            text-align: center;
            border-radius: 5px 15px 5px 5px;
            padding: 20px;
          }

          /* Improved Text Shadow Effect */
          .shiny-text {
            color: white;
            text-shadow: 
              -2px -2px 15px rgba(1, 0, 3, 0.91); /* Soft white edge glow */
          }
        `}
      </style>
    </div>
  );
};

export default RootNumber;
