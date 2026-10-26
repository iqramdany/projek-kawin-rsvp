import "./Invitation.css";

function Invitation() {
  return (
    <section className="invitation" id="couple">
      <div className="invitation-card">
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

        <h2 className="inv-parent">Muamar Aslie Bin Haznil &amp; Keluarga</h2>
        <h3 className="inv-note">
          (Wakil kepada Allahyarham Haznil Bin Husin &amp; Allahyarham Marjanah Binti Embor)
        </h3>

        <p className="invitation-serta">Serta</p>

        <h2 className="inv-parent">Rosnani Binti Ismail &amp; Keluarga</h2>
        <h3 className="inv-note">
          (Isteri kepada Allahyarham Mohamad Zaki Bin Lemas)
        </h3>

        <p className="invitation-text">
          Dengan penuh kesyukuran menjemput Dato' / Datin / Tuan / Puan /
          Encik / Cik untuk hadir ke majlis perkahwinan anakda kami,
        </p>

        <h2 className="inv-couple">
          <span>Sharmariz Binti Haznil</span>
          <i>&amp;</i>
          <span>Muhammad Iqram Daniel Bin Mohamad Zaki</span>
        </h2>

        <div className="invitation-divider" aria-hidden="true">
          <span />
          <i>✦</i>
          <span />
        </div>

        <p className="invitation-closing">
          Semoga kehadiran para jemputan akan menyempurnakan majlis kami dan
          diberkati oleh-Nya.
        </p>
      </div>
    </section>
  );
}

export default Invitation;