import React from "react";

export default function FamilyBlessings() {
  return (
    <div style={styles.container}>
      {/* Import Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cinzel:wght@400;600&family=Playfair+Display:ital,wght@1,400&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .family-title {
          font-family: 'Great Vibes', cursive !important;
        }
        .gold-subheading {
          font-family: 'Cinzel', serif !important;
        }
        .italic-text {
          font-family: 'Playfair Display', serif !important;
        }
        .pet-pill-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .pet-pill-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 15px rgba(224, 184, 120, 0.3) !important;
        }
      `}</style>

      {/* Main Content Wrapper */}
      <div style={styles.contentWrapper}>
        {/* Top Gold Subheading */}
        <div style={styles.topHeader}>
          <span className="gold-subheading" style={styles.subHeadingText}>
            WITH LOVE & BLESSINGS
          </span>
        </div>

        {/* Cursive Family Name */}
        <h1 className="family-title" style={styles.mainTitle}>
          Madaan Family
        </h1>

        {/* Italic Invitation Note */}
        <p className="italic-text" style={styles.invitationText}>
          Eagerly waiting for your presence,
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#4a0e17",
    backgroundImage:
      "radial-gradient(circle at center, #5c121e 0%, #3b0b12 100%)",
    width: "100%",
    padding: "80px 20px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#ffffff",
    position: "relative",
    overflow: "hidden",
  },
  contentWrapper: {
    maxWidth: "800px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    zIndex: 2,
  },
  topHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  subHeadingText: {
    color: "#e0b878", // Warm gold color
    fontSize: "13px",
    letterSpacing: "3px",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  mainTitle: {
    color: "#ffffff",
    fontSize: "64px",
    fontWeight: "normal",
    margin: "0",
    lineHeight: "1.1",
  },
  invitationText: {
    color: "#f3e5d8",
    fontSize: "18px",
    fontStyle: "italic",
    margin: "10px 0 20px 0",
    opacity: 0.95,
  },
  petPill: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    backgroundColor: "rgba(35, 6, 11, 0.45)",
    border: "1px solid #c59b53", // Golden outline border
    borderRadius: "40px",
    padding: "8px 24px 8px 10px",
    cursor: "default",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.25)",
  },
  avatarCircle: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    backgroundColor: "#522416",
    border: "1px solid #e0b878",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  pillTextContent: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  pillLabel: {
    fontSize: "10px",
    color: "#e0b878",
    letterSpacing: "1.5px",
    fontWeight: "600",
  },
  pillMessage: {
    fontSize: "14px",
    color: "#ffffff",
    fontFamily: "'Georgia', serif",
    lineHeight: "1.2",
  },
  highlightName: {
    color: "#ffc107", // Bright yellow-gold name highlight
    fontWeight: "700",
  },
};
