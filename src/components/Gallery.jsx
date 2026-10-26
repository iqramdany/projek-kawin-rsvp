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

const pad = (n) => String(n).padStart(2, "0");

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

        <div className="gallery-header">
          <p className="gallery-label">Our Story</p>

          <h2>Menuju Hari Bahagia</h2>

          <span>
            Sebuah kisah cinta yang akan
            <br />
            kami abadikan selamanya.
          </span>
        </div>

        <div className="countdown-container" role="timer">
          {items.map((item) => (
            <div className="countdown-item" key={item.label}>
              <span>{pad(item.value)}</span>
              <small>{item.label}</small>
            </div>
          ))}
        </div>

        <div className="gallery-grid">
          <div className="gallery-item gallery-item-large">
            <img
              src="/couple-cartoon.png"
              alt="Ilustrasi Iqram & Sharmariz"
              className="gallery-image"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

export default Gallery;