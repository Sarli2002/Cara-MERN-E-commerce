import React from "react";
import "./FeatureBox.css";

const FeatureBox = (props) => {
  return (
    <div className={`featureBox ${props.id}`}>
      <img src={props.image} alt="feature" />
      <h6>{props.name}</h6>
    </div>
  );
};

export default FeatureBox;

