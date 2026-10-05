import React, { useState, useEffect, useRef } from "react";
import Image1 from "./assets/HaldiImg.png";
import Image2 from "./assets/MehndiImg.png";
import Image3 from "./assets/WeddingImg.png";
import WeddingSong from "./assets/WeddSong.mpeg";

const timelineEvents = [
  {
    id: 1,
    title: "Mehndi",
    date: "21 November 2026",
    time: "8:00 PM",
    description:
      "Sufi Night An evening filled with mehndi, music, laughter and beautiful memories with family.",
    image: Image1,
    side: "right",
  },

  {
    id: 2,
    title: "Haldi",
    date: "22 November 2026",
    time: "04:00 PM",
    description:
      "A beautiful Haldi ceremony surrounded by family, love and happiness.",
    image: Image2,
    side: "left",
  },

  {
    id: 3,
    title: "Wedding",
    date: "23 November 2027",
    time: "8:00 PM",
    description:
      "The most beautiful chapter begins as we celebrate love and togetherness.",
    image: Image3,
    side: "right",
  },
];

export default function Timeline() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [visibleItems, setVisibleItems] = useState({});
  const itemRefs = useRef([]);
  const audioRef = useRef(null);

  // Background Song Link (Apna MP3 File URL yahan replace kar sakte ho)
  const songUrl = WeddingSong;

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log("Autoplay blocked or play failed:", err);
        });
    }
  };

  // Site khulte hi music chalane ki koshish
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const events = ["pointerup", "touchend", "click", "keydown"];

    const removeListeners = () => {
      events.forEach((ev) =>
        window.removeEventListener(ev, startOnInteraction),
      );
    };

    const startOnInteraction = () => {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          removeListeners();
        })
        .catch(() => {});
    };

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        events.forEach((ev) =>
          window.addEventListener(ev, startOnInteraction, { passive: true }),
        );
      });

    return removeListeners;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute("data-index");
            setVisibleItems((prev) => ({ ...prev, [index]: true }));
          }
        });
      },
      { threshold: 0.2 },
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div style={styles.container}>
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={songUrl} loop />

      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulseBar {
          0%, 100% { height: 4px; }
          50% { height: 12px; }
        }

        .timeline-card-hover {
          transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s ease;
        }

        .timeline-card-hover:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0 20px 35px rgba(107, 29, 47, 0.12) !important;
        }

        .img-zoom {
          transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .timeline-card-hover:hover .img-zoom {
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .timeline-line {
            left: 20px !important;
          }
          .timeline-node {
            left: 20px !important;
            transform: translateX(-50%) !important;
          }
          .timeline-item-container {
            width: 100% !important;
            padding-left: 50px !important;
            padding-right: 10px !important;
          }
        }
      `}</style>

      {/* Header Section */}
      <div style={styles.header}>
        <h1 style={styles.mainTitle}>Events Schedule</h1>
        <div style={styles.headerUnderline}></div>
      </div>

      {/* Timeline Wrapper */}
      <div style={styles.timelineWrapper}>
        <div className="timeline-line" style={styles.centralLine}></div>

        {timelineEvents.map((item, index) => {
          const isRight = item.side === "right";
          const isVisible = visibleItems[index];

          return (
            <div
              key={item.id}
              ref={(el) => (itemRefs.current[index] = el)}
              data-index={index}
              style={{
                ...styles.itemRow,
                justifyContent: isRight ? "flex-end" : "flex-start",
                opacity: isVisible ? 1 : 0,
                animation: isVisible
                  ? "fadeSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards"
                  : "none",
              }}
            >
              <div
                className="timeline-node"
                style={{ ...styles.nodeDot, top: "28px" }}
              ></div>

              <div
                className="timeline-card-hover timeline-item-container"
                style={{
                  ...styles.card,
                  marginRight: isRight ? "0" : "auto",
                  marginLeft: isRight ? "auto" : "0",
                }}
              >
                <h2 style={styles.cardTitle}>{item.title}</h2>

                <div style={styles.dateTime}>
                  <span>📅 {item.date}</span>
                  <span>🕐 {item.time}</span>
                </div>

                <p style={styles.cardDescription}>{item.description}</p>
                <div style={styles.imageBox}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="img-zoom"
                    style={styles.cardImage}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Compact Floating Music Player Button */}
      <button
        onClick={toggleMusic}
        style={{
          ...styles.compactMusicButton,
          backgroundColor: isPlaying ? "#4a1521" : "#6b1d2f",
        }}
        title={isPlaying ? "Pause Music" : "Play Music"}
      >
        <span style={{ fontSize: "13px" }}>{isPlaying ? "🔊" : "🎵"}</span>
        <span style={styles.compactText}>
          {isPlaying ? "PLAYING" : "MUSIC"}
        </span>
        {isPlaying && (
          <div style={styles.waveContainer}>
            <span
              style={{
                ...styles.waveBar,
                animation: "pulseBar 0.8s infinite 0.1s",
              }}
            ></span>
            <span
              style={{
                ...styles.waveBar,
                animation: "pulseBar 0.8s infinite 0.3s",
              }}
            ></span>
            <span
              style={{
                ...styles.waveBar,
                animation: "pulseBar 0.8s infinite 0.2s",
              }}
            ></span>
          </div>
        )}
      </button>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#C4A484", // Changed to soft Blushed Rose background
    minHeight: "100vh",
    width: "100%",
    padding: "60px 20px 100px 20px",
    boxSizing: "border-box",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Georgia', 'Segoe UI', serif",
    position: "relative",
    overflowX: "hidden",
  },
  header: {
    textAlign: "center",
    marginBottom: "60px",
  },

  dateTime: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap",

    marginBottom: "14px",

    fontSize: "14px",
    color: "#b87728",
    fontWeight: "600",
  },
  subTitle: {
    fontSize: "13px",
    letterSpacing: "3px",
    color: "#d48b38",
    fontWeight: "700",
    textTransform: "uppercase",
    display: "block",
    marginBottom: "8px",
  },
  mainTitle: {
    fontSize: "62px",
    color: "#4a1521",
    margin: "0 0 12px 0",
    fontWeight: "500",
    fontFamily: "'Dancing Script', cursive",
  },
  headerUnderline: {
    width: "50px",
    height: "3px",
    backgroundColor: "#e0b878",
    margin: "0 auto",
    borderRadius: "2px",
  },
  timelineWrapper: {
    maxWidth: "1000px",
    margin: "0 auto",
    position: "relative",
    padding: "20px 0",
  },
  centralLine: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "50%",
    width: "2px",
    backgroundColor: "#ebdada",
    transform: "translateX(-50%)",
  },
  itemRow: {
    display: "flex",
    width: "100%",
    position: "relative",
    marginBottom: "50px",
  },
  nodeDot: {
    position: "absolute",
    left: "50%",
    width: "10px",
    height: "10px",
    backgroundColor: "#4a1521",
    borderRadius: "50%",
    transform: "translateX(-50%)",
    zIndex: 3,
    boxShadow: "0 0 0 4px #fdf4f5",
  },
  card: {
    width: "45%",
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "28px",
    boxSizing: "border-box",
    boxShadow: "0 10px 25px rgba(0,0,0,0.04)",
    border: "1px solid rgba(230, 220, 208, 0.5)",
    position: "relative",
    zIndex: 2,
  },
  yearBadge: {
    display: "inline-block",
    backgroundColor: "#fff8e8",
    color: "#b87728",
    padding: "4px 12px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "700",
    marginBottom: "14px",
  },
  cardTitle: {
    fontSize: "34px",
    color: "#4a1521",
    margin: "0 0 10px 0",
    fontWeight: "500",
    fontFamily: "'Georgia', serif",
  },
  cardDescription: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#665955",
    margin: "0 0 20px 0",
  },
  imageBox: {
    width: "100%",
    height: "520px",
    borderRadius: "14px",
    overflow: "hidden",
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    display: "block",
  },
  /* Compact Music Control Button Style */
  compactMusicButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 14px",
    borderRadius: "20px",
    color: "#ffffff",
    border: "none",
    boxShadow: "0 6px 18px rgba(74, 21, 33, 0.25)",
    cursor: "pointer",
    zIndex: 100,
    transition: "all 0.3s ease",
  },
  compactText: {
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.8px",
  },
  waveContainer: {
    display: "flex",
    alignItems: "flex-end",
    gap: "2px",
    height: "12px",
    marginLeft: "2px",
  },
  waveBar: {
    width: "2px",
    backgroundColor: "#f5c98b",
    borderRadius: "1px",
  },
};
