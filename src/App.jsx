import React, { useState } from "react";

import FrontInvitation from "./FrontInvitation";

import Wedding from "./Wedding";
import Scratch from "./Scratch";
import Collection from "./Collection";
import Timeline from "./TimeLine";
import Blessing from "./Blessing";
import AwaitingPresence from "./Absense";
import Venue from "./Venue";
import FallingFlowers from "./FallingFlowers";

// Confetti celebration
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
  const particles = Array.from({ length: 120 }).map(() => ({
    x: Math.random() * canvas.width,
    y: -Math.random() * 80,
    vx: (Math.random() - 0.5) * 4,
    vy: Math.random() * 3 + 2,
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
      p.vy += 0.08;
      p.alpha -= 0.008;

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

const App = () => {
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <FrontInvitation
        onOpen={() => {
          setStarted(true);
          triggerCelebration();
        }}
      />
    );
  }

  return (
    <>
      <FallingFlowers />
      <div className="main-wedding-page">
        <Wedding />
        <Scratch />
        <Timeline />
        <Collection />
        <AwaitingPresence />
        <Blessing />
        <Venue />
      </div>
    </>
  );
};

export default App;
