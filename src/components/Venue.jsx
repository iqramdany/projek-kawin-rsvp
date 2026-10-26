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

            <p className="venue-address">
              Taman Nasalim, Lorong 7E, Lot 96
              <br />
              Taman Nasalim,
              <br />
              90000 Sandakan, Sabah,
              <br />
              Malaysia
            </p>


            <a
              href={MAP_LINK}
              target="_blank"
              rel="noreferrer"
              className="map-button"
            >
              ↗&nbsp; Buka Google Maps
            </a>
          </div>

          {/* live map (same location as the button) */}
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