import { useEffect, useRef, useState } from "react";
import "./GiftSection.css";

const QR_URL = "/duitnow-qr.png";
const FILE_NAME = "duitnow-qr.png";

const isIOS = () => {
  if (typeof navigator === "undefined") return false;

  return (
    /iPad|iPhone|iPod/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" &&
      navigator.maxTouchPoints > 1)
  );
};

// Download QR image
const downloadFile = (file) => {
  const url = URL.createObjectURL(file);

  const link = document.createElement("a");
  link.href = url;
  link.download = FILE_NAME;

  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 10000);
};

function GiftSection() {
  const fileRef = useRef(null);

  const [hint, setHint] = useState("");
  const [loading, setLoading] = useState(false);

  // Preload QR image
  useEffect(() => {
    let active = true;

    const prepareQR = async () => {
      try {
        const response = await fetch(QR_URL);

        if (!response.ok) {
          throw new Error("Failed to load QR");
        }

        const blob = await response.blob();

        if (!blob.type.startsWith("image/")) {
          throw new Error("Invalid image");
        }

        const file = new File([blob], FILE_NAME, {
          type: blob.type || "image/png",
        });

        if (active) {
          fileRef.current = file;
        }
      } catch (error) {
        console.error("QR preload error:", error);
      }
    };

    prepareQR();

    return () => {
      active = false;
    };
  }, []);

  // Open original QR image
  const openQR = () => {
    window.open(QR_URL, "_blank", "noopener,noreferrer");
  };

  // Save QR
  const saveQr = async () => {
    if (loading) return;

    setHint("");

    const ios = isIOS();
    const file = fileRef.current;

    // iOS: use native share sheet
    if (ios) {
      if (
        file &&
        navigator.share &&
        navigator.canShare?.({ files: [file] })
      ) {
        try {
          await navigator.share({
            files: [file],
            title: "DuitNow QR",
          });

          return;
        } catch (error) {
          if (error.name === "AbortError") return;

          console.error("Share error:", error);
        }
      }

      // iOS fallback
      setHint(
        "Tekan 'Buka Gambar QR', kemudian tekan ikon kongsi dan pilih 'Save Image'."
      );

      return;
    }

    // Android / Desktop
    try {
      setLoading(true);

      let qrFile = file;

      if (!qrFile) {
        const response = await fetch(QR_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch QR");
        }

        const blob = await response.blob();

        qrFile = new File([blob], FILE_NAME, {
          type: blob.type || "image/png",
        });

        fileRef.current = qrFile;
      }

      downloadFile(qrFile);

      setHint(
        "Muat turun telah dimulakan. Semak folder Downloads anda."
      );
    } catch (error) {
      console.error("Download error:", error);

      setHint(
        "Muat turun tidak disokong oleh pelayar ini. Sila buka gambar QR dan simpan secara manual."
      );
    } finally {
      setLoading(false);
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

        {/* SAVE BUTTON */}
        <button
          type="button"
          className="qr-save"
          onClick={saveQr}
          disabled={loading}
        >
          {loading ? (
            "Memproses..."
          ) : (
            <>
              <span aria-hidden="true">↓</span>
              &nbsp; Simpan Kod QR
            </>
          )}
        </button>

        {/* FALLBACK MESSAGE */}
        {hint && (
          <div className="qr-save-feedback" role="status">
            <p className="qr-hint">{hint}</p>

            <button
              type="button"
              className="qr-open"
              onClick={openQR}
            >
              Buka Gambar QR ↗
            </button>
          </div>
        )}

        <p className="gift-thanks">
          Terima kasih atas keikhlasan anda
        </p>

      </div>
    </section>
  );
}

export default GiftSection;