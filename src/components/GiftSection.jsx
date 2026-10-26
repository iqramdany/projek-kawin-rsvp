import "./GiftSection.css";

function GiftSection() {
  return (
    <section className="gift-section">
      <div className="gift-content">

        <p className="gift-label">
          Tanda Kasih
        </p>

        <h2>
          Hadiah & Sumbangan
        </h2>

        <p className="gift-message">
          Kehadiran dan doa restu anda sudah cukup bermakna
          buat kami. Jika anda ingin memberi tanda kasih,
          anda boleh menggunakan DuitNow QR di bawah.
        </p>

        <div className="qr-wrapper">
          <img
            src="/duitnow-qr.png"
            alt="DuitNow QR"
            className="qr-code"
          />
        </div>

        <p className="qr-text">
          Scan DuitNow QR
        </p>

      </div>
    </section>
  );
}

export default GiftSection;