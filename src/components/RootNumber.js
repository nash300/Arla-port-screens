import React from "react";

const RootNumber = ({ rootNr }) => {
  return (
    <div className="root-container border-bottom d-flex flex-column justify-content-center align-items-center h-100 w-100">
      {/* Root Number Display or "No Data" Message */}
      {rootNr ? (
        <div className="root-number d-flex justify-content-center align-items-center">
          <p className="shiny-text">{rootNr}</p>
        </div>
      ) : (
        <>---</>
      )}

      <style>
        {`
          .root-container {
            width: 100%;
            height: 100%;
            text-align: center;
            padding: 20px;
            background-color: #f8f9fa;
          }

          .root-number {
            width: 100%;
            min-width: 200px;
            height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 15vh;
            font-weight: bold;
            text-align: center;
            border-radius: 20px;
            padding: 20px;
            background: linear-gradient(145deg, #28a745, #1e7e34);
            box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.4),
                        inset -5px -5px 10px rgba(255, 255, 255, 0.2),
                        inset 5px 5px 10px rgba(0, 0, 0, 0.3);
            transition: transform 0.2s ease-in-out;
          }

          .shiny-text {
            color: white;
            text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.8), 
                        0px 0px 10px rgba(255, 255, 255, 0.7);
          }

          .no-data-message {
            font-size: 2rem;
            color: #888;
          }
        `}
      </style>
    </div>
  );
};

export default RootNumber;
