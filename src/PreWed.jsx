import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const weddingDate = new Date("2026-11-24T19:00:00");

const events = [
  {
    icon: "🌼",
    title: "Haldi",
    date: "23 November 2026",
    time: "10:00 AM onwards",
    place: "At Home",
    text: "A joyful turmeric ceremony filled with smiles, blessings and family.",
  },
  {
    icon: "🌿",
    title: "Mehendi",
    date: "23 November 2026",
    time: "05:00 PM onwards",
    place: "At Home",
    text: "An enchanting evening of henna, music and beautiful memories.",
  },
  {
    icon: "💍",
    title: "Wedding",
    date: "24 November 2026",
    time: "07:00 PM onwards",
    place: "The Grand Orchid",
    text: "The sacred wedding ceremony and the beginning of our forever.",
  },
];

const gallery = [
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519225856809-9d9c9b5f0e1f?auto=format&fit=crop&w=900&q=80",
];

function Countdown() {
  const getTime = () => {
    const diff = Math.max(0, weddingDate - new Date());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor(diff / 3600000) % 24,
      minutes: Math.floor(diff / 60000) % 60,
      seconds: Math.floor(diff / 1000) % 60,
    };
  };
  const [time, setTime] = useState(getTime());

  useEffect(() => {
    const id = setInterval(() => setTime(getTime()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="countdown">
      {Object.entries(time).map(([key, value]) => (
        <div className="time-box" key={key}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <span>{key}</span>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("locked", !opened);
    return () => document.body.classList.remove("locked");
  }, [opened]);

  if (!opened) {
    return (
      <main className="gate">
        <div className="petal petal-a">✦</div>
        <div className="petal petal-b">❀</div>
        <div className="gate-content">
          <p className="eyebrow">A LITTLE SOMETHING SPECIAL</p>
          <p className="om">ॐ</p>
          <h1>You’re Invited</h1>
          <p className="gate-sub">
            Tap the envelope to open our wedding invitation
          </p>
          <button
            className="envelope"
            onClick={() => setOpened(true)}
            aria-label="Open invitation"
          >
            <span className="envelope-flap"></span>
            <span className="seal">♡</span>
            <span className="envelope-name">A & R</span>
          </button>
          <p className="tap">TAP TO OPEN</p>
        </div>
      </main>
    );
  }

  return (
    <div className="site">
      <nav className="nav">
        <span>A & R</span>
        <a href="#events">Events</a>
        <a href="#gallery">Gallery</a>
        <a href="#venue">Venue</a>
      </nav>

      <header className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <p className="eyebrow">WITH LOVE & BLESSINGS</p>
          <p className="om">ॐ</p>
          <p className="script">Together with our families</p>
          <h1>
            <span>Jai</span>
            <i>&</i>
            <span>Riya</span>
          </h1>
          <p className="hero-date">24 · 11 · 2026</p>
          <p className="hero-line">We invite you to celebrate our beginning.</p>
          <a className="primary-btn" href="#events">
            Explore Invitation ↓
          </a>
        </div>
      </header>

      <section className="intro section">
        <p className="eyebrow">SHREE GANESHAYA NAMAH</p>
        <h2>Two hearts. One beautiful journey.</h2>
        <p className="body-copy">
          With the blessings of our loved ones, we are beginning a new chapter
          together and would be delighted to have you with us on our special
          day.
        </p>
        <div className="names">
          <div>
            <span>Daughter of</span>
            <h3>Family Name</h3>
          </div>
          <b>with</b>
          <div>
            <span>Son of</span>
            <h3>Family Name</h3>
          </div>
        </div>
      </section>

      <section className="date-section">
        <div className="section">
          <p className="eyebrow">SAVE THE DATE</p>
          <h2>Our forever starts in...</h2>
          <Countdown />
          <p className="date-big">24 November 2026</p>
        </div>
      </section>

      <section id="events" className="section">
        <p className="eyebrow">CELEBRATIONS</p>
        <h2>Events & Moments</h2>
        <div className="events">
          {events.map((event) => (
            <article className="event-card" key={event.title}>
              <div className="event-icon">{event.icon}</div>
              <p className="event-number">✦</p>
              <h3>{event.title}</h3>
              <p>{event.text}</p>
              <div className="event-info">
                <b>DATE</b>
                <span>{event.date}</span>
              </div>
              <div className="event-info">
                <b>TIME</b>
                <span>{event.time}</span>
              </div>
              <div className="event-info">
                <b>VENUE</b>
                <span>{event.place}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="gallery" className="gallery-section section">
        <p className="eyebrow">MOMENTS</p>
        <h2>A glimpse of our journey</h2>
        <div className="gallery">
          {gallery.map((src, i) => (
            <img key={src} src={src} alt={`Wedding moment ${i + 1}`} />
          ))}
        </div>
      </section>

      <section className="quote-section">
        <div>
          <span>❀</span>
          <h2>“And suddenly, all the love songs were about you.”</h2>
          <p>We cannot wait to celebrate this beautiful day with you.</p>
        </div>
      </section>

      <section id="venue" className="venue section">
        <p className="eyebrow">THE CELEBRATION</p>
        <h2>Where we celebrate</h2>
        <div className="venue-card">
          <div className="venue-image"></div>
          <div className="venue-details">
            <span>24 NOVEMBER · 7:00 PM</span>
            <h3>The Grand Orchid</h3>
            <p>Sector 78, Greater Faridabad, Haryana</p>
            <a
              className="primary-btn"
              target="_blank"
              rel="noreferrer"
              href="https://www.google.com/maps/search/?api=1&query=Greater+Faridabad"
            >
              Get Directions ↗
            </a>
          </div>
        </div>
      </section>

      <section className="contact section">
        <p className="eyebrow">NEED HELP?</p>
        <h2>Contact the family</h2>
        <div className="contacts">
          <a href="tel:+919999999999">
            <span>Family</span>
            <b>+91 99999 99999</b>
          </a>
          <a href="tel:+918888888888">
            <span>Family</span>
            <b>+91 88888 88888</b>
          </a>
        </div>
      </section>

      <footer>
        <p>WITH LOVE</p>
        <h2>Jai & Riya</h2>
        <span>24 · 11 · 2026</span>
        <small>Made with love ♡</small>
      </footer>
    </div>
  );
}
