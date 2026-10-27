import { useEffect, useRef, useState } from "react";
import "./EventDetails.css";

const icons = {
  guests: (
    <>
      <circle cx="8.5" cy="7.5" r="3"/><path d="M3 20c0-3.3 2.5-6 5.5-6s5.5 2.7 5.5 6"/><circle cx="17" cy="9" r="2.4"/><path d="M15.8 14.3c2.9.1 5.2 2.3 5.2 5.7"/><path d="M12 3.5l.6 1.3 1.3.6-1.3.6-.6 1.3-.6-1.3-1.3-.6 1.3-.6z"/>
    </>
  ),
  car: (
    <>
      <path d="M3 16v-3l2.2-.8L7.2 7.5h7.6l3 4.2 3.2.8V16h-2"/><path d="M3 16h2M9 16h6"/><path d="M7.5 11.7h9.7"/><path d="M12 7.5v4.2"/><circle cx="7" cy="16.5" r="2"/><circle cx="17" cy="16.5" r="2"/>
    </>
  ),
  kompang: (
    <>
      <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="6.3"/><path d="M12 9.2c1.2 0 1.8.9 1.4 1.8.9-.3 1.8.3 1.8 1.2s-.9 1.8-1.8 1.4c.3.9-.2 1.8-1.4 1.8s-1.7-.9-1.4-1.8c-.9.3-1.8-.2-1.8-1.4s.9-1.7 1.8-1.2c-.4-.9.2-1.8 1.4-1.8z"/><circle cx="12" cy="3.6" r=".4"/><circle cx="12" cy="20.4" r=".4"/><circle cx="3.6" cy="12" r=".4"/><circle cx="20.4" cy="12" r=".4"/>
    </>
  ),
  couple: (
    <>
      <circle cx="8.3" cy="9.5" r="2.5"/><path d="M5.6 8.4c.3-2 1.5-2.8 2.7-2.8s2.4.8 2.7 2.8z"/><path d="M2.8 20c0-3.1 2.4-5.5 5.5-5.5s5.5 2.4 5.5 5.5"/><circle cx="16.5" cy="10" r="2.3"/><path d="M13.8 9.6c.2-2.3 1.4-3.4 2.7-3.4s2.5 1.1 2.7 3.4M19.2 9.6c1 2 1.4 5.5 1.4 10.4"/><path d="M13.8 20c0-2.6 1.1-4.4 2.7-5 1.6.6 2.7 2.4 2.7 5"/><path d="M12.5 3.2c-.9-1-2.2-.1-1.6 1l1.6 1.5 1.6-1.5c.6-1.1-.7-2-1.6-1z"/>
    </>
  ),
  food: (
    <>
      <path d="M4 12h16c0 4.4-3.6 8-8 8s-8-3.6-8-8z"/><path d="M9 21.2h6"/><path d="M7 12c.2-2.4 2.3-4 5-4s4.8 1.6 5 4"/><path d="M9.5 6c-.9-.9.9-1.8 0-2.8M12.5 6c-.9-.9.9-1.8 0-2.8M15.5 6c-.9-.9.9-1.8 0-2.8"/>
    </>
  ),
  cake: (
    <>
      <rect x="3.5" y="15" width="17" height="5.5" rx="1"/><rect x="6.5" y="10" width="11" height="5" rx="1"/><path d="M3.5 17.7c1.4 1 2.8 1 4.2 0s2.8-1 4.2 0 2.8 1 4.2 0 2.8-1 4.2 0"/><circle cx="12" cy="7.6" r="1.6"/><path d="M12 6c0-1 .6-1.7 1.8-2.2"/>
    </>
  ),
  camera: (
    <>
      <path d="M3.5 8.5h3.2l1.6-2.5h7.4l1.6 2.5h3.2a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13.5" r="4"/><circle cx="12" cy="13.5" r="1.7"/><path d="M17.5 11.2h1.5"/><path d="M5.5 5.2h1.8"/>
    </>
  ),
  favour: (
    <>
      <path d="M12 3.5c-2.5 0-4.3 2.9-4.3 5.8 0 2.7 1.9 4.7 4.3 4.7s4.3-2 4.3-4.7c0-2.9-1.8-5.8-4.3-5.8z"/><path d="M12 14v1.3"/><path d="M12 15.3c-1.4-1.6-3.6-.9-3 .6s2.3.9 3-.6zM12 15.3c1.4-1.6 3.6-.9 3 .6s-2.3.9-3-.6z"/><path d="M6.8 17.5h10.4l-1.2 3.7H8z"/><path d="M5 5.5l.5 1 1 .5-1 .5-.5 1-.5-1-1-.5 1-.5zM19 4.5l.4.8.8.4-.8.4-.4.8-.4-.8-.8-.4.8-.4z"/>
    </>
  ),
};


const events = [
  { icon: "guests",  title: "Ketibaan Tetamu", time: "10:30 Pagi" },
  { icon: "car",     title: "Ketibaan Rombongan Keluarga", time: "10:50 Pagi" },
  { icon: "kompang", title: "Perarakan Keluarga Masuk", time: "10:55 Pagi" },
  { icon: "couple",  title: "Ketibaan Pengantin", time: "11:00 Pagi", featured: true },
  { icon: "food",    title: "Makan Beradab", time: "11:30 Tengah Hari" },
  { icon: "cake",    title: "Potong Kek", time: "12:00 Tengah Hari" },
  { icon: "camera",  title: "Sesi Bergambar", time: "12:20 Tengah Hari" },
  { icon: "favour",  title: "Majlis Bersurai", time: "2:00 Petang" },
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
      { threshold: 0.1 }
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

      <div className="tl">
        {events.map((ev, i) => (
          <div
            key={ev.title}
            className={`tl-item ${i % 2 ? "is-alt" : ""} ${
              ev.featured ? "is-featured" : ""
            }`}
            style={{ "--i": i }}
          >
            <div className="tl-card">
              <span className="tl-step">{String(i + 1).padStart(2, "0")}</span>
              <h3>{ev.title}</h3>
            </div>

            <div className="tl-dot">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {icons[ev.icon]}
              </svg>
            </div>

            <p className="tl-time">{ev.time}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default EventDetails;