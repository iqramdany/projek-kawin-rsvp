import { useEffect, useRef, useState } from "react";
import "./ContactFab.css";

/* ---------- EDIT THESE ----------
   phone: Malaysian number without "+" and without the leading 0
   e.g. 012-345 6789  ->  "60123456789"
---------------------------------- */
const contacts = [
  { name: "Hasanah", role: "Adik Lelaki Pengantin Perempuan", phone: "60143777935" },
  { name: "Iqram", role: " Pengantin Lelaki", phone: "601112043447" },
];

const WA_TEXT = encodeURIComponent("Assalamualaikum, saya ingin bertanya tentang majlis perkahwinan.");

const IconChat = (
  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
);
const IconPhone = (
  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
);
const IconClose = <path d="M6 6l12 12M18 6L6 18" />;

function ContactFab() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={`fab ${open ? "is-open" : ""}`} ref={ref}>
      <div className="fab-panel" role="dialog" aria-label="Hubungi Kami" aria-hidden={!open}>
        <p className="fab-title">Hubungi Kami</p>

        {contacts.map((c) => (
          <div className="fab-contact" key={c.phone}>
            <div className="fab-info">
              <strong>{c.name}</strong>
              <span>{c.role}</span>
            </div>

            <div className="fab-actions">
              <a
                className="fab-btn fab-wa"
                href={`https://wa.me/${c.phone}?text=${WA_TEXT}`}
                target="_blank"
                rel="noreferrer"
                aria-label={`WhatsApp ${c.name}`}
                tabIndex={open ? 0 : -1}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">{IconChat}</svg>
              </a>
              <a
                className="fab-btn fab-call"
                href={`tel:+${c.phone}`}
                aria-label={`Telefon ${c.name}`}
                tabIndex={open ? 0 : -1}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">{IconPhone}</svg>
              </a>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="fab-main"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Tutup" : "Hubungi Kami"}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          {open ? IconClose : IconChat}
        </svg>
      </button>
    </div>
  );
}

export default ContactFab;