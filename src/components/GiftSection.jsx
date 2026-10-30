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
  const [hint, setHint] = useState(false);

  // siapkan fail QR awal-awal (supaya iPhone boleh share terus bila ditekan)
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

  // cara asal (fetch semasa tekan) - hanya jika fail belum sempat siap
  const saveSlow = async () => {
    try {
      const res = await fetch(QR_URL);
      const blob = await res.blob();
      const file = new File([blob], "duitnow-qr.png", { type: blob.type });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: "DuitNow QR" });
        return;
      }

      if (isIOS) {
        setHint(true);
        return;
      }

      downloadFile(file);
    } catch (err) {
      if (err && err.name === "AbortError") return;
      if (isIOS) {
        setHint(true);
        return;
      }
      window.open(QR_URL, "_blank");
      setHint(true);
    }
  };

  const saveQr = () => {
    const file = fileRef.current;

    if (!file) {
      saveSlow();
      return;
    }

    // telefon: menu kongsi (ada Save Image)
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator
        .share({ files: [file], title: "DuitNow QR" })
        .catch((err) => {
          if (err && err.name === "AbortError") return; // tetamu tutup menu
          if (!isIOS) downloadFile(file);
          setHint(true);
        });
      return;
    }

    // iPhone tanpa menu kongsi: tunjuk arahan tekan lama
    if (isIOS) {
      setHint(true);
      return;
    }

    // komputer / Android: muat turun biasa
    downloadFile(file);
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

        <button type="button" className="qr-save" onClick={saveQr}>
          ↓&nbsp; Simpan Kod QR
        </button>

        {hint && (
          <p className="qr-hint">
            Tekan lama pada gambar QR di atas, kemudian pilih “Save Image”.
          </p>
        )}

        <p className="gift-thanks">Terima kasih atas keikhlasan anda</p>

      </div>
    </section>
  );
}

export default GiftSection;