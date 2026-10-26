import { useRef, useState } from "react";

import "./styles/home.css";

import Countdown from "./components/countdown";
import Invitation from "./components/Invitation";
import EventDetails from "./components/EventDetails";
import Venue from "./components/Venue";
import RSVP from "./components/RSVP";
import Gallery from "./components/Gallery";
import GiftSection from "./components/GiftSection";
import MobileMenu from "./components/MobileMenu";
import MusicPlayer from "./components/MusicPlayer";
import OpeningEnvelope from "./components/OpeningEnvelope";

// floating gold dust in the hero (fixed values so it never re-randomises)
const DUST = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 41 + 9) % 100,
  top: (i * 57 + 13) % 100,
  size: 2 + (i % 3),
  delay: (i * 0.6) % 6,
  dur: 6 + (i % 4) * 1.5,
}));

function App() {
  const audioRef = useRef(null);

  const [isOpening, setIsOpening] = useState(false); // envelope tapped
  const [isOpened, setIsOpened] = useState(false); // envelope finished
  const [isPlaying, setIsPlaying] = useState(false);

  // Scroll to RSVP
  const scrollToRsvp = () => {
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
  };

  // Start music (must be called from a tap)
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

  // Play / pause music
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

  // Tap on the envelope: start music + let the home page "pop" in
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
      />

      {/* MAIN WEBSITE
          "home-pop" + "is-live" start only after the envelope is tapped,
          so the hero entrance plays when the guest actually sees it */}
      <main className={`wedding-page${isOpening ? " home-pop is-live" : ""}`}>
        {/* HERO */}
        <section className="hero" id="home">
          {/* decoration */}
          <img
            className="corner corner-tl"
            src="/floral-left.png"
            alt=""
            draggable="false"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <img
            className="corner corner-br"
            src="/floral-right.png"
            alt=""
            draggable="false"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
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

          {/* content */}
          <p className="subtitle reveal" style={{ "--d": "0s" }}>
            Dengan penuh kesyukuran
          </p>

          <h1 className="reveal" style={{ "--d": "0.2s" }}>
            Iqram &amp; Sharmariz
          </h1>

          <div className="hero-ornament reveal" style={{ "--d": "0.4s" }} aria-hidden="true">
            <span />
            <i>✦</i>
            <span />
          </div>

          <p className="description reveal" style={{ "--d": "0.5s" }}>
            Majlis Perkahwinan
          </p>

          <p className="date reveal" style={{ "--d": "0.7s" }}>
            12 Disember 2026
          </p>

          <button
            className="rsvp-button reveal"
            style={{ "--d": "0.9s" }}
            onClick={scrollToRsvp}
          >
            RSVP Kehadiran
          </button>
        </section>

        {/* INVITATION */}
        <Invitation />

        {/* GALLERY */}
        <Gallery />

        {/* COUNTDOWN */}
        <Countdown />

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

        {/* MUSIC BUTTON */}
        <MusicPlayer isPlaying={isPlaying} onToggle={toggleMusic} />
      </main>
    </>
  );
}

export default App;