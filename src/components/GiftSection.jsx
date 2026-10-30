import { useEffect, useRef, useState } from "react";
import "./GiftSection.css";

const QR_URL = "/duitnow-qr.png";

const isIOS =
  typeof navigator !== "undefined" &&
  (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));

// muat turun biasa (komputer / Android)
const downloadFile = (file) => {
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = "duitnow-qr.png";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
};

function GiftSection() {
  const fileRef = useRef(null);
  const [fallback, setFallback] = useState(false);
  const [busy, setBusy] = useState(false);

  // siapkan fail QR awal-awal (iOS mesti share terus dalam tekanan jari)
  useEffect(() => {
    let alive = true;
    fetch(QR_URL)
      .then((r) => r.blob())
      .then((blob) => {
        if (alive && blob.type.startsWith("image/")) {
          fileRef.current = new File([blob], "duitnow-qr.png", {
            type: blob.type,
          });
        }
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const saveQr = () => {
    const file = fileRef.current;

    // 1) menu kongsi (iPhone HTTPS / Android) - mesti dipanggil serta-merta
    if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
      setBusy(true);
      navigator
        .share({ files: [file], title: "DuitNow QR" })
        .catch((err) => {
          if (err && err.name === "AbortError") return; // tetamu tutup menu
          setFallback(true);
        })
        .finally(() => setBusy(false));
      return;
    }

    // 2) iPhone tanpa menu kongsi (http / browser dalam app): tunjuk pautan buka
    if (isIOS) {
      setFallback(true);
      return;
    }

    // 3) komputer / Android: muat turun biasa
    if (file) {
      downloadFile(file);
      return;
    }

    // fail belum siap: cuba ambil sekarang
    setBusy(true);
    fetch(QR_URL)
      .then((r) => r.blob())
      .then((blob) => {
        if (!blob.type.startsWith("image/")) throw new Error("not image");
        downloadFile(new File([blob], "duitnow-qr.png", { type: blob.type }));
      })
      .catch(() => setFallback(true))
      .finally(() => setBusy(false));
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
              src={QR_URL}
              alt="DuitNow QR"
              className="qr-code"
              draggable="false"
            />
          </div>

          <p className="qr-text">
            Imbas dengan aplikasi perbankan
            <br />
            atau e-dompet anda
          </p>
        </div>

        <button
          type="button"
          className="qr-save"
          onClick={saveQr}
          disabled={busy}
        >
          ↓&nbsp; Simpan Kod QR
        </button>

        {fallback && (
          <div className="qr-save-feedback" role="status">
            <p className="qr-hint">
              Tekan lama pada gambar QR, kemudian pilih “Save Image”. Atau
              tekan butang di bawah untuk membuka gambar, kemudian simpan.
            </p>
            <a
              className="qr-open"
              href={QR_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Buka Kod QR
            </a>
          </div>
        )}

        <p className="gift-thanks">Terima kasih atas keikhlasan anda</p>

      </div>
    </section>
  );
}

export default GiftSection;