import "./Venue.css";

const MAP_LINK = "https://www.google.com/maps?q=5.8671963,118.0672106";
const MAP_EMBED =
  "https://www.google.com/maps?q=5.8671963,118.0672106&z=16&output=embed";

// Grab share link for the venue
const GRAB_LINK =
  "https://app.grab.com/open?screenType=CONSUMER_MAP_SEARCH&poiIDs=IT.0V93YY0AT4LMC&sourceID=share&og_title=96%2C+Lorong+Nasalim+7E%2C+Taman+Nasalim&og_description=96%2C+Lorong+Nasalim+7E%2C+Taman+Nasalim%2C+Sandakan%2C+90000%2C+Bahagian+Sandakan%2C+Sabah%2C+Malaysia&og_image=https%3A%2F%2Fcdn.kartaview.org%2Fenc%2Fcrop%3A84500000.0%3A21125000.0%3Anowe%3A0.0%3A11196250.0%2Fresize%3Afit%3A640%3A480%3A0%2FEe1dX--m_pErihIZdkv6VXPjyzt_vmg4HmZPjJDRGVqz90Wc3JyBmkeUKmF-EvLqCYjwwrhYvajiaY8bh2YcTqrtcINadrrmTmVHCW0Z6CQGjZGLbfTPAgTUrxQxW6-r4C2MpDIx-SM3TvKJzGIw35w2PQYkyeG116SGs_MRT2QtMUnUaedkucupjxeoCiDelou8Wof435yP_qNfso98cRM4&deeplink_safe_id=ed5377101833b653e655c352d350a6b0b9c5431a5851ff25d3df8f6d00c2331f&short_link_code=ssxJVVLo";

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

            {/* Two buttons side by side */}
            <div className="venue-map-actions">
              <a
                href={MAP_LINK}
                target="_blank"
                rel="noreferrer"
                className="map-button map-button-google"
              >
                <img
                  className="map-button-gicon"
                  src="/google-maps.png"
                  alt=""
                  draggable="false"
                />
                <span>Google Maps</span>
              </a>

              <a
                href={GRAB_LINK}
                target="_blank"
                rel="noreferrer"
                className="map-button map-button-grab"
                aria-label="Buka lokasi di Grab"
              >
                <img
                  className="map-button-grablogo"
                  src="/grab-logo.png"
                  alt="Grab"
                  draggable="false"
                />
              </a>
            </div>
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