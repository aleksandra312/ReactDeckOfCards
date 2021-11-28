import React from "react";
import "./Card.css";

const Card = ({ image, id }) => {
  return (
    <div
      className="Card"
      style={{
        backgroundImage: `url(${image})`,
        width: 226,
        height: 314,
      }}
    ></div>
  );
};

export default Card;
