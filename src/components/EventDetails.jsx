import { useEffect, useRef, useState } from "react";
import "./EventDetails.css";

/* ---------- line icons (inherit colour from CSS) ---------- */
const icons = {
  guests: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M16.5 14.2c2.7.2 4.5 2.4 4.5 5.3" />
    </>
  ),
  car: (
    <>
      <path d="M4 17v-5l2-5h12l2 5v5z" />
      <path d="M4 12h16" />
      <circle cx="8" cy="17.5" r="1.8" />
      <circle cx="16" cy="17.5" r="1.8" />
    </>
  ),
  rings: (
    <>
      <circle cx="9" cy="14.5" r="5" />
      <circle cx="15.5" cy="14.5" r="5" />
      <path d="M7 7.5l2-3 2 3-2 2z" />
    </>
  ),
  crown: (
    <>
      <path d="M3 18h18l1-10-5.5 4L12 5 7.5 12 2 8z" />
      <path d="M4 21h16" />
    </>
  ),
  food: (
    <>
      <path d="M4 16a8 8 0 0 1 16 0z" />
      <path d="M2.5 19h19" />
      <path d="M12 8V6.5" />
      <circle cx="12" cy="5.5" r="1" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8h3l1.5-2.5h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
      <circle cx="12" cy="13.5" r="3.5" />
    </>
  ),
  gift: (
    <>
      <rect x="3" y="9" width="18" height="11" rx="1" />
      <path d="M12 9v11M3 13.5h18" />
      <path d="M12 9c-1-4-5-4.5-5-2s3 2 5 2zM12 9c1-4 5-4.5 5-2s-3 2-5 2z" />
    </>
  ),
};

const events = [
  { icon: "guests", title: "Ketibaan Tetamu", time: "10:00 Pagi" },
  { icon: "car", title: "Ketibaan Pengantin", time: "11:30 Pagi" },
  { icon: "rings", title: "Majlis Akad Nikah", time: "12:00 Tengah Hari", featured: true },
  { icon: "crown", title: "Bersanding", time: "1:00 Petang" },
  { icon: "food", title: "Makan Beradab", time: "1:30 Petang" },
  { icon: "camera", title: "Sesi Bergambar", time: "2:00 Petang" },
  { icon: "gift", title: "Majlis Bersurai", time: "3:00 Petang" },
];

function EventDetails() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  // animate the items in when the section scrolls into view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`event-details ${visible ? "is-visible" : ""}`}
    >
      <div className="event-header">
        <p>Save the Date</p>
        <h2>Atur Cara Majlis</h2>
        <div className="event-divider" aria-hidden="true">
          <span />
          <i>✦</i>
          <span />
        </div>
      </div>

      <div className="event-timeline">
        {events.map((ev, i) => (
          <div
            key={ev.title}
            className={`timeline-item ${ev.featured ? "is-featured" : ""}`}
            style={{ "--i": i }}
          >
            <div className="timeline-dot">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {icons[ev.icon]}
              </svg>
              <span className="timeline-step">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="timeline-content">
              <h3>{ev.title}</h3>
              <p className="timeline-time">{ev.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default EventDetails;