import { useEffect, useState } from "react";
import "./Countdown.css";

const WEDDING_DATE = new Date("December 12, 2026 00:00:00").getTime();

const calculateTimeLeft = () => {
  const difference = WEDDING_DATE - Date.now();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    done: false,
  };
};

const pad = (n) => String(n).padStart(2, "0");

function Countdown() {
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
    <section className="countdown">
      <p className="countdown-subtitle">Menuju Hari Bahagia</p>

      <h2>Our Wedding Day</h2>

      <p className="countdown-date">12 Disember 2026</p>

      <div className="countdown-container" role="timer">
        {items.map((item) => (
          <div className="countdown-item" key={item.label}>
            <span>{pad(item.value)}</span>
            <small>{item.label}</small>
          </div>
        ))}
      </div>

      {timeLeft.done && (
        <p className="countdown-done">Hari bahagia kami telah tiba</p>
      )}
    </section>
  );
}

export default Countdown;