import React from "react";
import "./NewsLetter.css";
const NewsLetter = () => {
  return (
    <div className="newsletter section-p1 section-m1">
      <div class="newstext">
        <h4>Sign Up for Newsletters</h4>
        <p>
          Get Email updates about our latest shop and{" "}
          <span> special offers.</span>{" "}
        </p>
      </div>
      <div class="form">
        <input type="text" placeholder="Your email address" />
        <button class="btn ">Sign Up</button>
      </div>
    </div>
  );
};

export default NewsLetter;
