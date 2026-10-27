import "./GiftSection.css";

function GiftSection() {
  const saveQr = async () => {
    const file_url = "/duitnow-qr.png";

    try {
      const res = await fetch(file_url);
      const blob = await res.blob();
      const file = new File([blob], "duitnow-qr.png", { type: blob.type });

      // telefon: buka menu kongsi (ada pilihan Save Image)
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: "DuitNow QR" });
        return;
      }

      // komputer / Android: muat turun biasa
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "duitnow-qr.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      // tetamu tutup menu kongsi = bukan ralat
      if (err && err.name === "AbortError") return;
      // jika gagal, buka gambar supaya boleh tekan lama untuk simpan
      window.open(file_url, "_blank");
    }
  };

  return (
    <section className="gift-section">
      <div className="gift-content">

        <span className="gift-icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="8" width="18" height="4" rx="1" />
            <path d="M5 12v8h14v-8" />
            <path d="M12 8v12" />
            <path d="M12 8c-1.5-4-5.5-4.5-5.5-2.2C6.5 7 8.5 8 12 8z" />
            <path d="M12 8c1.5-4 5.5-4.5 5.5-2.2C17.5 7 15.5 8 12 8z" />
          </svg>
        </span>

        <p className="gift-label">Tanda Kasih</p>

        <h2>Hadiah &amp; Sumbangan</h2>

        <div className="gift-divider" aria-hidden="true">
          <span />
          <i>✦</i>
          <span />
        </div>

        <p className="gift-message">
          Kehadiran dan doa restu anda sudah cukup bermakna buat kami.
          Jika anda ingin memberi tanda kasih, anda boleh menggunakan
          DuitNow QR di bawah.
        </p>

        <div className="qr-card">
          <span className="qr-tab">DuitNow QR</span>

          <div className="qr-frame">
            <img
              src="/duitnow-qr.png"
              alt="DuitNow QR"
              className="qr-code"
            />
          </div>

          <p className="qr-text">
            Imbas dengan aplikasi perbankan
            <br />
            atau e-dompet anda
          </p>
        </div>

        <button type="button" className="qr-save" onClick={saveQr}>
          ↓&nbsp; Simpan Kod QR
        </button>

        <p className="gift-thanks">Terima kasih atas keikhlasan anda</p>

      </div>
    </section>
  );
}

export default GiftSection;