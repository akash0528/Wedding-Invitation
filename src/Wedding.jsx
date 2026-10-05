import React from "react";
import Ganesh from "./assets/ganesh.webp";
import WeddingPicture from "./assets/Invitation.png";
import "./Wedding.css";

const Wedding = () => {
  return (
    <div className="wedding-container">
      {/* Invitation Background */}
      <img
        src={WeddingPicture}
        alt="Wedding Invitation"
        className="wedding-image"
        loading="lazy"
      />

      {/* Ganesh Ji */}
      <img
        src={Ganesh}
        alt="Shree Ganesh"
        className="ganesh-image"
        loading="lazy"
      />

      {/* Invitation Content */}
      <div className="wedding-content">
        {/* Shree Ganeshaya */}
        <p className="ganesh-text">‖ Shree Ganeshaya Namah ‖</p>
        {/* Introduction */}
        <p className="family-text">
          We solicit your gracious presence on the <br /> auspicious occasion of
          the wedding celebration of
        </p>
        {/* Jai */}
        <div className="person person-one">
          <h1 className="couple-name">Riya</h1>

          <p className="parent-label">D/O</p>

          <p className="parents">
            Mrs. Manju Madaan
            <br />
            &amp; Mr. Rajesh Madaan
          </p>
        </div>
        {/* With */}
        <div className="and-text">with</div>
        {/* Priya */}
        <div className="person person-two">
          <h1 className="couple-name">Jai</h1>

          <p className="parent-label">S/O</p>

          <p className="parents">
            Mrs. Prem Batra
            <br />
            &amp; Mr. Rakesh Batra
          </p>
        </div>
        {/* Invitation Message */}{" "}
        <p className="invite-text">
          {" "}
          cordially invite you to join the occasion of <br /> their joyous
          commitment{" "}
        </p>{" "}
        {/* Bottom Wedding Quote */}{" "}
        <p className="wedding-quote">
          {" "}
          Two hearts, one beautiful journey,
          <br /> forever together.{" "}
        </p>
      </div>
    </div>
  );
};

export default Wedding;
