import React, { useState, useEffect, useRef } from "react";

// Card ki size screen ke hisaab se nikalta hai (mobile pe side margin ke saath)
const getSizes = () => {
  const vw = typeof window !== "undefined" ? window.innerWidth : 380;
  return {
    slimW: Math.min(380, vw - 48),
    slimH: 128,
    openW: Math.min(350, vw - 32),
  };
};

// Rounded rectangle path (har browser mein chalta hai)
const roundedRectPath = (ctx, x, y, w, h, r) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
};

export default function Scratch() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [currentView, setCurrentView] = useState("scratch");
  const [sizes, setSizes] = useState(getSizes());
  const [fontsReady, setFontsReady] = useState(false);
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  // Live Countdown State to Nov 23, 2026
  const [timeLeft, setTimeLeft] = useState({
    days: 52,
    hours: 14,
    minutes: 0,
    seconds: 47,
  });

  // Fonts load karo
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Canvas pe text tabhi sahi font mein aayega jab font load ho chuka ho
    if (document.fonts && document.fonts.load) {
      Promise.all([
        document.fonts.load("600 16px 'Cinzel'"),
        document.fonts.load("italic 14px 'Cormorant Garamond'"),
      ])
        .then(() => setFontsReady(true))
        .catch(() => setFontsReady(true));
    } else {
      setFontsReady(true);
    }
  }, []);

  // Screen resize / rotate hone par size update
  useEffect(() => {
    const onResize = () => setSizes(getSizes());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const targetDate = new Date("2026-11-23T00:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  // Celebration burst
  const triggerCelebration = () => {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "99999";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#d4af37", "#f78fb3", "#e83e8c", "#f8a5c2", "#e15f41"];
    const particles = Array.from({ length: 80 }).map(() => ({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 0.7) * 12,
      size: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2;
        p.alpha -= 0.015;

        if (p.alpha > 0) {
          alive = true;
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      if (alive) {
        requestAnimationFrame(animate);
      } else {
        document.body.removeChild(canvas);
      }
    };
    animate();
  };

  // Gold overlay draw karo (screenshot 2 jaisa: gold + inner border + sparkles + bold text)
  useEffect(() => {
    if (currentView !== "scratch" || isRevealed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const w = sizes.slimW;
    const h = sizes.slimH;
    const dpr = window.devicePixelRatio || 1;

    // Canvas ko sharp rakhne ke liye (width attribute set hone par context reset hota hai)
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Rounded shape ke andar hi draw hoga
    ctx.save();
    roundedRectPath(ctx, 0, 0, w, h, 18);
    ctx.clip();

    // Gold gradient
    const gradient = ctx.createLinearGradient(0, 0, w, h * 0.9);
    gradient.addColorStop(0, "#d2ad47");
    gradient.addColorStop(0.22, "#efe4a8");
    gradient.addColorStop(0.5, "#c19a2c");
    gradient.addColorStop(0.76, "#e9d284");
    gradient.addColorStop(1, "#b4872a");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // Sparkle dots (fixed pattern, har baar same)
    let seed = 7;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < 45; i++) {
      const s = 1 + rand() * 2.2;
      ctx.fillStyle = `rgba(255,255,255,${0.25 + rand() * 0.4})`;
      ctx.fillRect(rand() * w, rand() * h, s, s);
    }
    ctx.restore();

    // Andar ki maroon-brown border
    ctx.strokeStyle = "#9a5a35";
    ctx.lineWidth = 2;
    roundedRectPath(ctx, 9, 9, w - 18, h - 18, 3);
    ctx.stroke();

    // Text
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.font = "600 16px 'Cinzel', serif";
    ctx.fillStyle = "#6b1d2a";
    ctx.fillText("✦ SCRATCH TO REVEAL ✦", w / 2, h / 2 - 8);

    ctx.font = "italic 500 14px 'Cormorant Garamond', serif";
    ctx.fillStyle = "#5c2a1a";
    ctx.fillText("Tap or drag to reveal the date", w / 2, h / 2 + 16);
  }, [currentView, isRevealed, sizes, fontsReady]);

  // Pop-up khula ho to peeche ka page scroll na ho
  useEffect(() => {
    if (isRevealed && currentView === "scratch") {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isRevealed, currentView]);

  const scratch = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";

    checkScratchPercentage();
  };

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext("2d");

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentCount = 0;
    let total = 0;

    // Har 4th pixel check (fast)
    for (let i = 3; i < pixels.length; i += 16) {
      total++;
      if (pixels[i] === 0) transparentCount++;
    }

    const percentage = (transparentCount / total) * 100;
    if (percentage > 35) {
      setIsRevealed(true);
      triggerCelebration();
    }
  };

  const handlePointerDown = (e) => {
    isDrawing.current = true;
    handlePointerMove(e);
  };

  const handlePointerUp = () => {
    isDrawing.current = false;
  };

  const handlePointerMove = (e) => {
    if (!isDrawing.current || isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const point = e.touches && e.touches[0] ? e.touches[0] : e;
    const rect = canvas.getBoundingClientRect();
    const x = point.clientX - rect.left;
    const y = point.clientY - rect.top;

    scratch(x, y);
  };

  return (
    <div style={styles.container}>
      <style>{`@keyframes popIn { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }`}</style>
      {/* Background Floating Petals & Floral Elements */}
      <div style={styles.petalLayer}>
        <span style={{ ...styles.petal, top: "4%", left: "2%" }}>🍃</span>
        <span style={{ ...styles.petal, top: "20%", left: "4%" }}>🌸</span>
        <span style={{ ...styles.petal, top: "12%", right: "30%" }}>🌸</span>
        <span style={{ ...styles.petal, top: "15%", right: "28%" }}>🌸</span>
        <span style={{ ...styles.petal, top: "4%", right: "2%" }}>🌸</span>
        <span style={{ ...styles.petal, top: "22%", right: "5%" }}>🌼</span>
        <span style={{ ...styles.petal, bottom: "32%", left: "8%" }}>🌼</span>
        <span style={{ ...styles.petal, bottom: "35%", left: "24%" }}>🌸</span>
        <span style={{ ...styles.petal, bottom: "30%", left: "28%" }}>🌸</span>
        <span style={{ ...styles.petal, bottom: "2%", left: "2%" }}>🌼</span>
        <span style={{ ...styles.petal, bottom: "14%", left: "14%" }}>🌼</span>
        <span style={{ ...styles.petal, bottom: "2%", right: "38%" }}>🌸</span>
        <span style={{ ...styles.petal, bottom: "25%", right: "12%" }}>🌸</span>
        <span style={{ ...styles.petal, bottom: "6%", right: "3%" }}>🍃</span>
      </div>

      {/* Main View */}
      <main style={styles.main}>
        {currentView === "scratch" ? (
          <div style={styles.cardWrapper}>
            {/* Slim card: scratch karne par neeche sirf date dikhti hai */}
            <div
              style={{
                ...styles.card,
                ...styles.cardSlim,
                width: sizes.slimW,
                height: sizes.slimH,
              }}
            >
              <p style={styles.saveTheDate}>✦ SAVE THE DATE ✦</p>
              <p style={styles.weddingDate}>23TH NOVEMBER 2026</p>
            </div>

            {/* Pop-up: scratch complete hone par blur background ke saath */}
            {isRevealed && (
              <div style={styles.overlay}>
                <div
                  style={{
                    ...styles.card,
                    ...styles.cardRevealed,
                    width: sizes.openW,
                    animation: "popIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <p style={styles.saveTheDate}>✦ SAVE THE DATE ✦</p>
                  <h1 style={styles.coupleNames}>Jai & Riya</h1>
                  <div style={styles.divider}></div>
                  <p style={styles.weddingDate}>23TH NOVEMBER 2026</p>
                  <p style={styles.tagline}>
                    We cannot wait to celebrate our special day with you!
                  </p>

                  <div style={styles.badge}>
                    ⏳ {timeLeft.days} DAYS {timeLeft.hours} HOURS TO GO!
                  </div>

                  <button
                    onClick={() => {
                      triggerCelebration();
                      setCurrentView("countdown");
                    }}
                    style={styles.exploreBtn}
                  >
                    EXPLORE INVITATION 🌸
                  </button>
                </div>
              </div>
            )}

            {!isRevealed && (
              <canvas
                ref={canvasRef}
                onMouseDown={handlePointerDown}
                onMouseUp={handlePointerUp}
                onMouseLeave={handlePointerUp}
                onMouseMove={handlePointerMove}
                onTouchStart={handlePointerDown}
                onTouchEnd={handlePointerUp}
                onTouchMove={handlePointerMove}
                style={{
                  ...styles.canvas,
                  width: sizes.slimW,
                  height: sizes.slimH,
                }}
              />
            )}
          </div>
        ) : (
          /* Countdown View */
          <div style={styles.countdownContainer}>
            <div style={styles.dateBox}>
              <p style={styles.saveTheDateHeader}>SAVE THE DATE</p>
              <h2 style={styles.weddingDateHeader}>23TH NOVEMBER 2026</h2>
            </div>

            <div style={styles.grid}>
              {[
                { label: "DAYS", val: timeLeft.days },
                { label: "HOURS", val: timeLeft.hours },
                { label: "MINUTES", val: timeLeft.minutes },
                { label: "SECONDS", val: timeLeft.seconds },
              ].map((item, idx) => (
                <div key={idx} style={styles.timerColumn}>
                  <div style={styles.timerBox}>
                    <span style={styles.timerNum}>
                      {String(item.val).padStart(2, "0")}
                    </span>
                  </div>
                  <span style={styles.timerLabel}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Minimalistic Luxury Styles
const styles = {
  container: {
    minHeight: "auto",
    width: "100%",
    backgroundColor: "#fffaf7",
    color: "#6b2121",
    fontFamily: "'Cinzel', 'Georgia', serif",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "80px 12px",
    boxSizing: "border-box",
    overflow: "hidden",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
    boxSizing: "border-box",
    backgroundColor: "rgba(40, 10, 15, 0.35)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  },
  petalLayer: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    zIndex: 1,
  },
  petal: {
    position: "absolute",
    fontSize: "18px",
    opacity: 0.85,
    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.03))",
  },
  main: {
    margin: "auto 0",
    zIndex: 10,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cardWrapper: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "100%",
  },
  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #f2e3d5",
    borderRadius: "18px",
    boxShadow: "0 10px 40px rgba(220,190,170,0.15)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    boxSizing: "border-box",
  },
  cardSlim: {
    padding: "10px",
    overflow: "hidden",
  },
  cardRevealed: {
    minHeight: "380px",
    padding: "30px 20px",
  },
  canvas: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    borderRadius: "18px",
    cursor: "pointer",
    touchAction: "none",
    zIndex: 20,
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },
  saveTheDate: {
    fontSize: "10px",
    letterSpacing: "4px",
    color: "#a3826a",
    margin: "0 0 8px 0",
  },
  coupleNames: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "32px",
    fontStyle: "italic",
    color: "#6b2121",
    margin: "2px 0",
    fontWeight: "400",
  },
  divider: {
    width: "40px",
    height: "1px",
    backgroundColor: "#e0c283",
    margin: "12px 0",
  },
  weddingDate: {
    fontSize: "14px",
    letterSpacing: "3px",
    color: "#6b2121",
    margin: "4px 0",
  },
  tagline: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "13px",
    fontStyle: "italic",
    color: "#8c6b51",
    margin: "6px 0 16px 0",
  },
  badge: {
    backgroundColor: "#faf0e6",
    color: "#7a482b",
    fontSize: "10px",
    letterSpacing: "2px",
    padding: "6px 16px",
    borderRadius: "20px",
    border: "1px solid #ebd3c2",
    marginBottom: "20px",
  },
  exploreBtn: {
    backgroundColor: "#8b263e",
    color: "#ffffff",
    fontSize: "10px",
    letterSpacing: "3px",
    padding: "12px 26px",
    borderRadius: "25px",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(139, 38, 62, 0.25)",
  },
  countdownContainer: {
    width: "100%",
    maxWidth: "520px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "24px",
  },
  dateBox: {
    backgroundColor: "#ffffff",
    border: "1px solid #f3e5d8",
    borderRadius: "16px",
    padding: "24px 30px",
    textAlign: "center",
    width: "100%",
    boxSizing: "border-box",
    boxShadow: "0 8px 25px rgba(220, 190, 170, 0.12)",
  },
  saveTheDateHeader: {
    fontSize: "18px",
    letterSpacing: "4px",
    color: "#8c6142",
    margin: "0 0 10px 0",
  },
  weddingDateHeader: {
    fontSize: "clamp(22px, 7vw, 36px)",
    letterSpacing: "3px",
    color: "#6b2121",
    margin: 0,
    fontWeight: "400",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
    width: "100%",
  },
  timerColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  timerBox: {
    backgroundColor: "#ffffff",
    border: "1px solid #f3e5d8",
    borderRadius: "16px",
    width: "100%",
    height: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 6px 20px rgba(220, 190, 170, 0.1)",
    boxSizing: "border-box",
  },
  timerNum: {
    fontFamily: "'Cinzel', serif",
    fontSize: "30px",
    color: "#6b2121",
    fontWeight: "400",
  },
  timerLabel: {
    fontSize: "9px",
    color: "#8c6142",
    letterSpacing: "3px",
    marginTop: "10px",
    textTransform: "uppercase",
  },
};
