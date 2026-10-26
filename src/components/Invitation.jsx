import "./Invitation.css";

function Invitation() {
  return (
    <section className="invitation" id="couple">
      <div className="invitation-card">
        {/* floral corners (files in /public) */}
        <img
          className="inv-corner inv-corner-tl"
          src="/floral-left.png"
          alt=""
          draggable="false"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
        <img
          className="inv-corner inv-corner-br"
          src="/floral-right.png"
          alt=""
          draggable="false"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />

        <p className="invitation-label" lang="ar" dir="rtl">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>

        <p className="invitation-intro">
          Dengan penuh kesyukuran ke hadrat Allah SWT,
        </p>

        <h2>Iqram &amp; Sharmariz</h2>

        <p className="invitation-text">
          Dengan sukacitanya kami menjemput Dato' / Datin /
          Tuan / Puan / Encik / Cik untuk hadir ke majlis
          perkahwinan kami dan bersama-sama meraikan hari
          bahagia ini.
        </p>

        <div className="invitation-divider" aria-hidden="true">
          <span />
          <i>✦</i>
          <span />
        </div>

        <p className="invitation-closing">
          Kehadiran dan doa restu anda amat kami hargai.
        </p>
      </div>
    </section>
  );
}

export default Invitation;