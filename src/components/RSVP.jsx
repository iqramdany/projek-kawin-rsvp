import { useState } from "react";
import "./RSVP.css";

const MAX_GUESTS = 10; // highest number guests can pick (change if you want a lower limit)

const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbygfTCV5UJ-JyxKR9-OukSa_wZVy2IQjrEsfCy3Ag4DwdGo4yQzKAbxE2kbKJtI8YLD/exec";

function RSVP() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [attendance, setAttendance] = useState("");
  const [guests, setGuests] = useState(1);

  const increaseGuests = () => {
    setGuests((current) => Math.min(current + 1, MAX_GUESTS));
  };

  const decreaseGuests = () => {
    setGuests((current) => Math.max(current - 1, 1));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSending(true);

    try {
      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams({
          name,
          attendance,
          guests,
          message,
        }),
      });
      setSubmitted(true);
    } catch (error) {
      alert("Maaf, RSVP gagal dihantar. Sila cuba lagi.");
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <section id="rsvp" className="rsvp">
        <div className="rsvp-success">
          <span className="success-icon">✦</span>

          <p className="success-label">RSVP Diterima</p>

          <h2>Terima Kasih</h2>

          <p className="success-main">
            Kehadiran anda telah direkodkan.
          </p>

          <p className="success-message">
            Kami sangat menantikan kehadiran anda
            <br />
            di hari bahagia kami.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="rsvp">
      <div className="rsvp-header">
        <p className="rsvp-label">RSVP</p>

        <h2>Sahkan Kehadiran</h2>

        <span>
          Kami amat berbesar hati untuk menerima
          <br />
          kehadiran anda.
        </span>

        {/* limited-invitation notice: guests see it before they fill the form */}
        <div className="rsvp-note">
          <p className="rsvp-note-title">Jemputan adalah terhad</p>
          <p className="rsvp-note-text">
            kepada tetamu yang dijemput sahaja.
          </p>
        </div>
      </div>

      <form className="rsvp-form" onSubmit={handleSubmit}>
        {/* Nama */}
        <div className="form-group">
          <label htmlFor="name">Nama</label>

          <input
            id="name"
            type="text"
            placeholder="Nama penuh"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Kehadiran */}
        <div className="form-group">
          <label>Kehadiran</label>

          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="attendance"
                value="yes"
                checked={attendance === "yes"}
                onChange={() => setAttendance("yes")}
              />

              <span className="radio-custom"></span>

              <span>Ya, saya akan hadir</span>
            </label>

            <label className="radio-option">
              <input
                type="radio"
                name="attendance"
                value="no"
                checked={attendance === "no"}
                onChange={() => setAttendance("no")}
              />

              <span className="radio-custom"></span>

              <span>Maaf, saya tidak dapat hadir</span>
            </label>
          </div>
        </div>

        {/* Bilangan Tetamu */}
        {attendance === "yes" && (
          <div className="form-group guest-group">
            <label>Bilangan Tetamu</label>

            <div className="guest-counter">
              <button
                type="button"
                className="counter-button"
                onClick={decreaseGuests}
                disabled={guests === 1}
                aria-label="Kurangkan bilangan tetamu"
              >
                −
              </button>

              <span className="guest-number">{guests}</span>

              <button
                type="button"
                className="counter-button"
                onClick={increaseGuests}
                disabled={guests === MAX_GUESTS}
                aria-label="Tambah bilangan tetamu"
              >
                +
              </button>
            </div>
          </div>
        )}

        {/* Ucapan */}
        <div className="form-group">
          <label htmlFor="message">Ucapan</label>

          <textarea
            id="message"
            rows="4"
            placeholder="Tinggalkan ucapan untuk pasangan..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="rsvp-submit"
          disabled={!attendance || sending}
        >
          {sending ? "Menghantar..." : "Hantar RSVP"}
        </button>
      </form>
    </section>
  );
}

export default RSVP;