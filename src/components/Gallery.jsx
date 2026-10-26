import "./Gallery.css";

function Gallery() {
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

        <div className="gallery-grid">
          <div className="gallery-item gallery-item-large">
            <img src="/couple-cartoon.png" alt="Ilustrasi Iqram & Sharmariz" className="gallery-image" />
          </div>
        </div>

      </div>
    </section>
  );
}

export default Gallery;
