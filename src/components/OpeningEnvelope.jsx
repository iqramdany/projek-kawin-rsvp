import { useEffect, useRef, useState } from "react";
import "./OpeningEnvelope.css";

const DURATION_MS = 3200; // must match the CSS timings

// floating gold dust (fixed values so it never re-randomises)
const DUST = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  top: (i * 53 + 7) % 100,
  size: 2 + (i % 3),
  delay: (i * 0.7) % 5,
  dur: 5 + (i % 4) * 1.5,
}));

function OpeningEnvelope({ onOpen, onStart }) {
  const [opening, setOpening] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    onStart?.(); // start music + home "pop"
    timer.current = setTimeout(() => onOpen?.(), DURATION_MS);
  };

  return (
    <section
      className={`opening-envelope ${opening ? "is-opening" : ""}`}
      onClick={handleOpen}
    >
      {/* decoration behind the envelope */}
      <div className="decor" aria-hidden="true">
        <img className="corner corner-tl" src="/floral-left.png" alt="" draggable="false"
             onError={(e) => (e.currentTarget.style.display = "none")} />
        <img className="corner corner-br" src="/floral-right.png" alt="" draggable="false"
             onError={(e) => (e.currentTarget.style.display = "none")} />
        <div className="dust">
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
      </div>

      <div className="stage">
        {/* The envelope is built in code, so closed and open are the SAME object */}
        <div className="envelope">


          <div className="env-shadow" />
          <div className="env-back" />

          {/* the letter: hidden inside, slides up after the flap opens */}
          <div className="letter">
            <div className="letter-inner">
              <span className="letter-small">Anda</span>
              <span className="letter-script">dijemput</span>
              <span className="letter-line" />
              <span className="letter-date">12.12.2026</span>
            </div>
          </div>

          {/* front pocket (three folds) */}
          <div className="pocket">
            <div className="fold fold-l" />
            <div className="fold fold-r" />
            <div className="fold fold-b" />
          </div>

          {/* soft shadow under the flap + fold creases */}
          <svg className="creases" viewBox="0 0 395 269" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <filter id="crease-blur" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="2.5" />
              </filter>
            </defs>
            <path className="flap-shadow" d="M0 4 L197.5 160 L395 4" fill="none"
                  stroke="#000" strokeOpacity="0.45" strokeWidth="4" filter="url(#crease-blur)" />
            <path d="M197.5 150 L395 268" stroke="rgba(255,205,205,0.3)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <path d="M197.5 150 L0 268" stroke="rgba(255,205,205,0.14)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </svg>

          {/* flap: rotates open in 3D */}
          <div className="flap">
            <div className="flap-face flap-front" />
            <div className="flap-face flap-back" />
          </div>

          {/* flowers (optional file: /floral-left.png) */}
          <img
            className="flowers"
            src="/floral-left.png"
            alt=""
            draggable="false"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />

          {/* wax seal = the open button */}
          <button
            type="button"
            className="seal-button"
            aria-label="Buka Jemputan"
            onClick={(e) => {
              e.stopPropagation();
              handleOpen();
            }}
          >
            <img src="/wax-seal.png" alt="" draggable="false" />
          </button>
        </div>

        <p className="envelope-hint">Sentuh untuk membuka jemputan</p>
      </div>
    </section>
  );
}

export default OpeningEnvelope;