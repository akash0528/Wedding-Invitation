import React from "react";

export default function Venue() {
  const mapAddress =
    "Vione Convention Centre, Gate No.7, CWG Stadium, Akshardham Rd, Commonwealth Games Village, Pandav Nagar, Delhi-92";

  // Vione Convention Centre, Akshardham, Delhi ka Sahi Google Maps Embed Link
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    mapAddress,
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  // Direct Directions Link
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    mapAddress,
  )}`;

  const contacts = [{ name: "Jai ", phone: "+91 70428 00690" }];

  return (
    <div style={styles.container}>
      {/* Import Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cinzel:wght@500;600&family=Playfair+Display:wght@400;600&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .venue-cursive {
          font-family: 'Great Vibes', cursive !important;
        }
        .venue-gold-label {
          font-family: 'Cinzel', serif !important;
        }
        .venue-serif {
          font-family: 'Playfair Display', serif !important;
        }

        .btn-directions {
          transition: all 0.3s ease;
        }
        .btn-directions:hover {
          background-color: '#a36325' !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(184, 119, 40, 0.3);
        }

        .contact-card-hover {
          transition: all 0.3s ease;
        }
        .contact-card-hover:hover {
          transform: translateY(-3px);
          border-color: #d49a46 !important;
          box-shadow: 0 8px 20px rgba(107, 29, 47, 0.08) !important;
        }

        /* Mobile & Tablet Responsive Adjustments */
        @media (max-width: 768px) {
          .venue-main-title {
            font-size: 42px !important;
          }
          .venue-contact-grid {
            grid-template-columns: 1fr !important;
            max-width: 360px !important;
          }
          .map-box-container {
            height: 320px !important;
          }
        }
      `}</style>

      <div style={styles.contentWrapper}>
        {/* ================= VENUE SECTION ================= */}
        <section style={styles.section}>
          <span className="venue-gold-label" style={styles.topSubLabel}>
            VENUE
          </span>
          <h2
            className="venue-cursive venue-main-title"
            style={styles.mainHeading}
          >
            Where We Celebrate
          </h2>

          <div style={styles.venueAddressBox}>
            <h3 className="venue-serif" style={styles.venueName}>
              Vione Convention Centre
            </h3>
            <p className="venue-serif" style={styles.venueAddress}>
              Gate No.7, CWG Stadium, Akshardham Rd, Commonwealth Games Village,
              Pandav Nagar, Delhi-92
            </p>
          </div>

          {/* Map Container */}
          <div className="map-box-container" style={styles.mapCard}>
            <iframe
              title="Venue Location Map"
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Get Directions Button */}
          <a
            href={googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-directions venue-gold-label"
            style={styles.directionsBtn}
          >
            <span style={{ fontSize: "15px" }}>↗</span> GET DIRECTIONS
          </a>
        </section>

        {/* ================= CONTACT FAMILY SECTION ================= */}
        <section style={{ ...styles.section, marginTop: "20px" }}>
          <span className="venue-gold-label" style={styles.topSubLabel}>
            FOR ASSISTANCE & QUERIES
          </span>
          <h2
            className="venue-cursive venue-main-title"
            style={styles.mainHeading}
          >
            Contact Family
          </h2>

          {/* Responsive Cards Grid */}
          <div className="venue-contact-grid" style={styles.contactGrid}>
            {contacts.map((contact, idx) => (
              <a
                key={idx}
                href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                className="contact-card-hover"
                style={{
                  ...styles.contactCard,
                  gridColumn: idx === 2 ? "span 1" : "auto",
                }}
              >
                <div style={styles.callIconCircle}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                <div style={styles.contactDetails}>
                  <div className="venue-serif" style={styles.contactName}>
                    {contact.name}
                  </div>
                  <div style={styles.contactPhone}>{contact.phone}</div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#faf6f2", // Soft off-white / light cream background
    width: "100%",
    padding: "60px 20px",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  contentWrapper: {
    maxWidth: "900px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "50px",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  topSubLabel: {
    color: "#b87728", // Golden brown accent color
    fontSize: "12px",
    letterSpacing: "3px",
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: "6px",
  },
  mainHeading: {
    color: "#6b1d2f", // Rich maroon/burgundy heading
    fontSize: "56px",
    fontWeight: "normal",
    margin: "0 0 18px 0",
    lineHeight: "1.1",
  },
  venueAddressBox: {
    marginBottom: "24px",
  },
  venueName: {
    fontSize: "20px",
    color: "#332927",
    margin: "0 0 6px 0",
    fontWeight: "600",
  },
  venueAddress: {
    fontSize: "14px",
    color: "#665955",
    margin: "0",
    lineHeight: "1.5",
  },
  mapCard: {
    width: "100%",
    maxWidth: "800px",
    height: "420px",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
    border: "1px solid rgba(212, 154, 70, 0.25)",
    marginBottom: "28px",
  },
  directionsBtn: {
    backgroundColor: "#6b1d2f",
    color: "white",
    padding: "12px 30px",
    borderRadius: "30px",
    textDecoration: "none",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "1.5px",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 4px 14px rgba(184, 119, 40, 0.25)",
    cursor: "pointer",
  },
  contactGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "16px",
    width: "100%",
    maxWidth: "620px",
    marginTop: "10px",
    justifyContent: "center",
  },
  contactCard: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    backgroundColor: "#ffffff",
    border: "1px solid #ebdada",
    borderRadius: "40px",
    padding: "10px 20px 10px 10px",
    textDecoration: "none",
    textAlign: "left",
    boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
  },
  callIconCircle: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    backgroundColor: "#6b1d2f",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  contactDetails: {
    display: "flex",
    flexDirection: "column",
  },
  contactName: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#332927",
  },
  contactPhone: {
    fontSize: "13px",
    color: "#665955",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
};
