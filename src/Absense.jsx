import React from "react";

export default function AwaitingPresence() {
  return (
    <div style={styles.container}>
      {/* Google Cursive Font Import */}
      <link
        href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@1,400&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .cursive-heading {
          font-family: 'Great Vibes', cursive !important;
        }
        .italic-subtitle {
          font-family: 'Playfair Display', serif !important;
        }
      `}</style>

      <div style={styles.contentWrapper}>
        {/* Cursive Main Title */}
        <h2 className="cursive-heading" style={styles.mainHeading}>
          Awaiting Your Noble Presence
        </h2>

        {/* Italic Subtitle Tagline */}
        <p className="italic-subtitle" style={styles.subtitleText}>
          Because meeting two souls requires twice the fun — and you!
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#faf6f2",
    width: "100%",
    padding: "70px 20px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  contentWrapper: {
    maxWidth: "850px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
  },
  mainHeading: {
    color: "#6b1d2f",
    fontSize: "56px",
    fontWeight: "normal",
    margin: "0",
    lineHeight: "1.2",
  },
  subtitleText: {
    color: "#554a47",
    fontSize: "17px",
    fontStyle: "italic",
    margin: "0",
    letterSpacing: "0.3px",
    opacity: 0.9,
  },
};
