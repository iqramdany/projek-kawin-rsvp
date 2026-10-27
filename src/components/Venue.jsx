import "./Venue.css";

const MAP_LINK = "https://www.google.com/maps?q=5.8671963,118.0672106";
const MAP_EMBED = "https://www.google.com/maps?q=5.8671963,118.0672106&z=16&output=embed";

function Venue() {
  return (
    <section className="venue">
      <div className="venue-inner">

        <div className="venue-header">
          <p className="venue-label">Tempat Majlis</p>

          <h2>Lokasi Kami</h2>

          <div className="venue-divider">
            <span></span>
            <i>✦</i>
            <span></span>
          </div>
        </div>

        <div className="venue-layout">

          <div className="venue-info">
            <p className="venue-small-label">THE VENUE</p>

            <h3>Taman Nasalim</h3>

            <div className="venue-address-box">
              <span className="venue-address-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="17"
                  height="17"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
                  <circle cx="12" cy="10" r="2.4" />
                </svg>
              </span>

              <address className="venue-address">
                <span className="addr-main">Taman Nasalim, Lorong 7E, Lot 96</span>
                <span className="addr-sub">Taman Nasalim,</span>
                <span className="addr-sub">90000 Sandakan, Sabah,</span>
              </address>
            </div>

            <a
              href={MAP_LINK}
              target="_blank"
              rel="noreferrer"
              className="map-button"
            >
              ↗&nbsp; Buka Google Maps
            </a>
          </div>

          {/* Live Map */}
          <div className="venue-map">
            <iframe
              title="Peta lokasi majlis"
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

        </div>

      </div>
    </section>
  );
}

export default Venue;