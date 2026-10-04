import React, { useState } from "react";
import "./FrontInvitation.css";

const FrontInvitation = ({ onOpen }) => {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;

    setOpening(true);

    // Opening animation + Akash & Priya ke baad
    setTimeout(() => {
      onOpen();
    }, 2500);
  };

  return (
    <div className={`front-page ${opening ? "opening" : ""}`}>
      {/* TOP */}
      <div className="front-heading">
        <span>AN INVITATION</span>

        <h1>To Celebrate</h1>

        <p>Love • Family • Forever</p>
      </div>

      {/* ENVELOPE */}
      <div className="envelope-area" onClick={handleOpen}>
        <div className="envelope">
          <div className="letter">
            <span className="letter-small">SAVE THE DATE</span>

            <h2>
              Jai
              <span>&</span>
              Riya
            </h2>

            <p>12 January 2027</p>
          </div>

          <div className="envelope-body">
            <div className="envelope-left"></div>
            <div className="envelope-right"></div>
            <div className="envelope-bottom"></div>
          </div>

          <div className="envelope-flap"></div>

          <div className="wax-seal">
            <span>♥</span>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="open-message">
        <span className="click-icon">↓</span>

        <p>Tap the seal to open</p>

        <small>A beautiful beginning awaits you</small>
      </div>

      {/* OPENING SCREEN */}
      {opening && (
        <div className="opening-overlay">
          <div className="opening-text">
            <span>WITH LOVE</span>

            <h2>Jai &amp; Riya</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default FrontInvitation;
