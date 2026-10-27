import { useEffect, useState } from "react";
import "./Gallery.css";

const WEDDING_DATE = new Date("December 12, 2026 00:00:00").getTime();

const calculateTimeLeft = () => {
  const difference = WEDDING_DATE - Date.now();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const formatValue = (value, label) => {
  if (label === "Hari") return String(value);
  return String(value).padStart(2, "0");
};

function Gallery() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const items = [
    { value: timeLeft.days, label: "Hari" },
    { value: timeLeft.hours, label: "Jam" },
    { value: timeLeft.minutes, label: "Minit" },
    { value: timeLeft.seconds, label: "Saat" },
  ];

  return (
    <section className="gallery">
      <div className="gallery-inner">
        {/* Title */}
        <h2 className="gallery-title">Menuju Hari Bahagia</h2>

        {/* Countdown */}
        <div
          className="countdown-container"
          role="timer"
          aria-live="polite"
          aria-label={`Baki masa: ${timeLeft.days} hari, ${timeLeft.hours} jam, ${timeLeft.minutes} minit, ${timeLeft.seconds} saat`}
        >
          {items.map((item) => (
            <div className="countdown-item" key={item.label}>
              <span aria-hidden="true">
                {formatValue(item.value, item.label)}
              </span>
              <small aria-hidden="true">{item.label}</small>
            </div>
          ))}
        </div>

        {/* Story text */}
        <p className="gallery-text">
          Sebuah kisah cinta yang akan
          <br />
          kami abadikan selamanya.
        </p>

        {/* Photo frame */}
        <div className="gallery-grid">
          <div className="gallery-item gallery-item-large">
            <img
              src="/couple-cartoon.png"
              alt="Ilustrasi Iqram & Sharmariz"
              className="gallery-image"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Gallery;