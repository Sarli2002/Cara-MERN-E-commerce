import React from 'react';
import "./SmallBannerBox.css";
function BannerBox(props) {
  return (
    <div className="banner-box" style={{ backgroundImage: `url(${props.backgroundImage})` }}>
      <h4>{props.heading}</h4>
      <h2>{props.deal}</h2>
      <span>{props.des}</span>
      <button className="white">Learn More</button>
    </div>
  );
}

export default BannerBox;
