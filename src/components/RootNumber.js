import React from "react";

const RootNumber = ({ rootNr }) => {
  return (
    <div className="root-number">
      {rootNr}
      <style>
        {`
          .root-number {
            width: 100%; 
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12vw; /* Responsive large text */
            font-weight: bold;
            text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.4); /* 3D Text Effect */
            background: linear-gradient(145deg, #4CAF50, #388E3C); /* Green Gradient */
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2), /* Outer shadow */
                        inset 2px 2px 25px rgba(1, 1, 1, 0.79), /* Inner shine */
                        inset -10px -10px 50px rgba(0, 0, 0, 0.3); /* Inner shadow */
            border-radius: 15px;
            color: white;
            padding: 20px;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
};

export default RootNumber;
