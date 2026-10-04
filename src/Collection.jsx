import React, { useState, useEffect } from "react";
import Image1 from "./assets/img1.jpeg";
import Image2 from "./assets/img2.jpeg";
import Image3 from "./assets/img3.jpeg";
import Image4 from "./assets/img4.jpeg";
import Image5 from "./assets/img5.jpeg";

const galleryData = [
  {
    id: 1,
    image: Image1,
  },
  {
    id: 2,
    image: Image2,
  },
  {
    id: 3,
    image: Image3,
  },
  {
    id: 4,
    image: Image4,
  },
  {
    id: 5,
    image: Image5,
  },
];

export default function WeddingGallery() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isAutoplay, setIsAutoplay] = useState(false);

  useEffect(() => {
    let interval;
    if (isAutoplay) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % galleryData.length);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isAutoplay]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? galleryData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === galleryData.length - 1 ? 0 : prev + 1));
  };

  const getCardStyle = (index) => {
    const total = galleryData.length;
    let diff = index - activeIndex;

    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const absDiff = Math.abs(diff);

    if (absDiff > 2) {
      return { display: "none" };
    }

    const translateX = diff * 220;
    const translateZ = -absDiff * 150;
    const rotateY = diff * -25;
    const opacity = absDiff === 0 ? 1 : absDiff === 1 ? 0.8 : 0.4;
    const zIndex = 10 - absDiff;

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
      opacity: opacity,
      zIndex: zIndex,
      display: "block",
    };
  };

  return (
    <div style={styles.container}>
      {/* Background Petals Accent */}
      <div style={styles.petal1}>🌸</div>
      <div style={styles.petal2}>🌸</div>
      <div style={styles.petal3}>✨</div>

      {/* Header Section (1st Image Style) */}
      <div style={styles.headerContainer}>
        <span style={styles.subHeading}>MOMENTS</span>
        <h1 style={styles.mainTitle}>Our Gallery</h1>
        <div style={styles.dividerLine}>
          <span style={styles.diamond}>◇</span>
          <span style={styles.diamondActive}>◆</span>
          <span style={styles.diamond}>◇</span>
        </div>
        <p style={styles.description}>
          A glimpse into our journey of love and togetherness
        </p>
      </div>

      {/* 3D Coverflow Slider Area */}
      <div style={styles.sliderViewport}>
        <div style={styles.slider3DContainer}>
          {galleryData.map((item, index) => {
            const cardStyle = getCardStyle(index);
            const isActive = index === activeIndex;

            return (
              <div
                key={item.id}
                onClick={() => setActiveIndex(index)}
                style={{
                  ...styles.card,
                  ...cardStyle,
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={styles.cardImage}
                />

                <div
                  style={{
                    ...styles.cardOverlay,
                    background: isActive
                      ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)"
                      : "rgba(0,0,0,0.3)",
                  }}
                >
                  <div
                    style={{
                      ...styles.cardTextContent,
                      opacity: isActive ? 1 : 0.6,
                    }}
                  >
                    <div style={styles.cardTag}>
                      {item.date} • {item.location}
                    </div>
                    <h3 style={styles.cardTitle}>{item.title}</h3>
                    <p style={styles.cardSubtitle}>{item.subtitle}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls (2nd Image Style) */}
      <div style={styles.controlsContainer}>
        <button
          onClick={handlePrev}
          style={styles.controlBtn}
          aria-label="Previous"
        >
          ←
        </button>
        <button
          onClick={handleNext}
          style={styles.controlBtn}
          aria-label="Next"
        >
          →
        </button>
      </div>

      {/* Pagination Indicators */}
      <div style={styles.dotsContainer}>
        {galleryData.map((_, i) => (
          <span
            key={i}
            onClick={() => setActiveIndex(i)}
            style={{
              ...styles.dot,
              width: i === activeIndex ? "24px" : "8px",
              backgroundColor: i === activeIndex ? "#6b1d2f" : "#ccc",
              borderRadius: "4px",
            }}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#faf6f0",
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    boxSizing: "border-box",
    fontFamily: "'Georgia', serif",
    position: "relative",
    overflow: "hidden",
    WebkitTapHighlightColor: "transparent",
    userSelect: "none",
    WebkitUserSelect: "none",
  },
  headerContainer: {
    textAlign: "center",
    marginBottom: "30px",
    zIndex: 2,
  },
  subHeading: {
    fontSize: "12px",
    letterSpacing: "4px",
    color: "#8b6b61",
    textTransform: "uppercase",
    display: "block",
    marginBottom: "8px",
  },
  mainTitle: {
    fontSize: "48px",
    fontStyle: "italic",
    color: "#6b1d2f",
    margin: "0 0 10px 0",
    fontWeight: "normal",
  },
  dividerLine: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    margin: "10px 0",
  },
  diamond: {
    fontSize: "10px",
    color: "#d4af37",
  },
  diamondActive: {
    fontSize: "12px",
    color: "#6b1d2f",
  },
  description: {
    fontSize: "14px",
    fontStyle: "italic",
    color: "#7a6a65",
    margin: 0,
  },
  sliderViewport: {
    width: "100%",
    maxWidth: "1100px",
    height: "460px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    perspective: "1000px",
    margin: "20px 0",
  },
  slider3DContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transformStyle: "preserve-3d",
  },
  card: {
    position: "absolute",
    width: "320px",
    height: "420px",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 20px 30px rgba(0,0,0,0.2)",
    cursor: "pointer",
    transition: "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
    backgroundColor: "#fff",
    WebkitTapHighlightColor: "transparent",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    userSelect: "none",
    WebkitUserDrag: "none",
    pointerEvents: "none",
  },
  cardOverlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: "20px",
    boxSizing: "border-box",
  },
  cardTextContent: {
    color: "#ffffff",
    transition: "opacity 0.3s ease",
  },
  cardTag: {
    fontSize: "11px",
    letterSpacing: "1px",
    opacity: 0.8,
    marginBottom: "4px",
    textTransform: "uppercase",
  },
  cardTitle: {
    fontSize: "22px",
    margin: "0 0 4px 0",
    fontWeight: "600",
  },
  cardSubtitle: {
    fontSize: "12px",
    opacity: 0.9,
    margin: 0,
    fontWeight: "300",
  },
  controlsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    marginTop: "10px",
    zIndex: 10,
  },
  controlBtn: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "linear-gradient(135deg,  #4a1521)",
    border: "none",
    color: "#ffffff",
    fontSize: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 6px 15px rgba(71, 132, 255, 0.4)",
    transition: "transform 0.2s ease, boxShadow 0.2s ease",
    WebkitTapHighlightColor: "transparent",
    outline: "none",
  },
  dotsContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "20px",
  },
  dot: {
    height: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    WebkitTapHighlightColor: "transparent",
  },
  petal1: {
    position: "absolute",
    top: "10%",
    left: "8%",
    fontSize: "24px",
    opacity: 0.6,
  },
  petal2: {
    position: "absolute",
    top: "20%",
    right: "10%",
    fontSize: "20px",
    opacity: 0.5,
  },
  petal3: {
    position: "absolute",
    bottom: "15%",
    left: "5%",
    fontSize: "18px",
    opacity: 0.4,
  },
};
