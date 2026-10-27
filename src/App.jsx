import { useRef, useState } from "react";

import "./styles/home.css";

import Invitation from "./components/Invitation";
import EventDetails from "./components/EventDetails";
import Venue from "./components/Venue";
import RSVP from "./components/RSVP";
import Gallery from "./components/Gallery";
import GiftSection from "./components/GiftSection";
import MobileMenu from "./components/MobileMenu";
import MusicPlayer from "./components/MusicPlayer";
import OpeningEnvelope from "./components/OpeningEnvelope";
import ContactFab from "./components/ContactFab";

// Floating gold dust
const DUST = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 41 + 9) % 100,
  top: (i * 57 + 13) % 100,
  size: 2 + (i % 3),
  delay: (i * 0.6) % 6,
  dur: 6 + (i % 4) * 1.5,
}));

// Small gold-line rose with two leaves (used on the RSVP button corners)
function RoseSprig() {
  const outerPetals = [0, 72, 144, 216, 288];
  const innerPetals = [36, 108, 180, 252, 324];

  return (
    <svg viewBox="0 0 90 70" focusable="false" aria-hidden="true">
      {/* leaves */}
      <g
        fill="#6f7a3a"
        stroke="#d9b66a"
        strokeWidth="0.8"
        strokeLinejoin="round"
      >
        <path d="M44 36 C36 20 22 15 8 17 C13 31 28 40 44 36 Z" />
        <path d="M46 44 C38 58 24 63 10 60 C16 48 32 40 46 44 Z" />
      </g>

      {/* leaf veins */}
      <g
        fill="none"
        stroke="#d9b66a"
        strokeWidth="0.7"
        strokeLinecap="round"
      >
        <path d="M43 36 C33 28 22 23 11 19" />
        <path d="M45 44 C34 50 24 55 13 59" />
      </g>

      {/* rose */}
      <g
        transform="translate(58 38)"
        stroke="#9c7a35"
        strokeWidth="0.7"
        strokeLinejoin="round"
      >
        {outerPetals.map((a) => (
          <ellipse
            key={`o${a}`}
            cx="0"
            cy="-9"
            rx="8.5"
            ry="10"
            fill="#efdcae"
            transform={`rotate(${a})`}
          />
        ))}

        {innerPetals.map((a) => (
          <ellipse
            key={`i${a}`}
            cx="0"
            cy="-5.5"
            rx="5.5"
            ry="6.5"
            fill="#f8ecce"
            transform={`rotate(${a})`}
          />
        ))}

        <circle r="5" fill="#e6cd8f" />

        <path
          d="M0 -1.5 C1.8 -1.5 2.6 0.8 1 2 C-1 3.4 -3.6 1.4 -3 -1.4 C-2.2 -4.4 2 -4.8 3.6 -2.2"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

function App() {
  const audioRef = useRef(null);

  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Smooth scroll to RSVP
  const scrollToRsvp = () => {
    const target = document.getElementById("rsvp");

    if (!target) {
      console.warn('No element with id="rsvp" found');
      return;
    }

    const top = target.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  // Start music
  const playMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.log("Music could not start:", error);
    }
  };

  // Toggle music
  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      await playMusic();
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  // Opening envelope
  const handleStart = () => {
    setIsOpening(true);
    playMusic();
  };

  return (
    <>
      {/* OPENING ENVELOPE */}
      {!isOpened && (
        <OpeningEnvelope
          onStart={handleStart}
          onOpen={() => setIsOpened(true)}
        />
      )}

      {/* MUSIC */}
      <audio
        ref={audioRef}
        src="/music/wedding-song.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* MAIN WEBSITE */}
      <main className={`wedding-page${isOpening ? " home-pop is-live" : ""}`}>
        {/* HERO */}
        <section className="hero" id="home">

          {/* FLORAL DECORATION */}
          <img
            className="corner corner-tl"
            src="/floral-left.png"
            alt=""
            draggable="false"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />

          <img
            className="corner corner-br"
            src="/floral-right.png"
            alt=""
            draggable="false"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />

          {/* FLOATING GOLD DUST */}
          <div className="hero-dust" aria-hidden="true">
            {DUST.map((d, i) => (
              <span
                key={i}
                style={{
                  left: `${d.left}%`,
                  top: `${d.top}%`,
                  width: d.size,
                  height: d.size,
                  animationDelay: `${d.delay}s`,
                  animationDuration: `${d.dur}s`,
                }}
              />
            ))}
          </div>

          {/* SUBTITLE */}
          <p className="subtitle reveal" style={{ "--d": "0s" }}>
            Dengan penuh kesyukuran
          </p>

          {/* MONOGRAM */}
          <h1 className="hero-monogram-wrap reveal" style={{ "--d": "0.2s" }}>
            <img
              className="hero-monogram"
              src="/monogram.png"
              alt="Iqram & Sharmariz"
              draggable="false"
            />
          </h1>

          {/* ORNAMENT */}
          <div
            className="hero-ornament reveal"
            style={{ "--d": "0.4s" }}
            aria-hidden="true"
          >
            <span />
            <i>✦</i>
            <span />
          </div>

          {/* DESCRIPTION */}
          <p className="description reveal" style={{ "--d": "0.5s" }}>
            Majlis Perkahwinan
          </p>

          {/* DATE */}
          <p className="date reveal" style={{ "--d": "0.7s" }}>
            12 Disember 2026
          </p>

          {/* RSVP BUTTON WITH ROSES */}
          <button
            type="button"
            className="rsvp-button reveal"
            style={{ "--d": "0.9s" }}
            onClick={scrollToRsvp}
            aria-label="Sahkan kehadiran ke majlis perkahwinan"
          >
            <span className="rsvp-flower rsvp-flower-tl" aria-hidden="true">
              <RoseSprig />
            </span>

            <span className="rsvp-flower rsvp-flower-br" aria-hidden="true">
              <RoseSprig />
            </span>

            <span className="rsvp-text">Sahkan Kehadiran</span>

            <span className="rsvp-arrow" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </span>
          </button>

        </section>

        {/* INVITATION */}
        <Invitation />

        {/* GALLERY */}
        <Gallery />

        {/* EVENT DETAILS */}
        <section id="event">
          <EventDetails />
          <Venue />
        </section>

        {/* GIFT */}
        <section id="gift">
          <GiftSection />
        </section>

        {/* RSVP */}
        <section id="rsvp">
          <RSVP />
        </section>

        {/* MOBILE MENU */}
        <MobileMenu />

        {/* MUSIC PLAYER */}
        <MusicPlayer isPlaying={isPlaying} onToggle={toggleMusic} />

        {/* CONTACT BUTTON */}
        <ContactFab />

      </main>
    </>
  );
}

export default App;