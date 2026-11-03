import { useEffect, useState } from "react";
import "./Ucapanwall.css";

const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbyMG3HiqrZYwmWVCHDnEPdndWZJWoTIxvyZpbHMnjgEZFhRVJH1C3KxmWpcLKzHqoIOKg/exec";

const MIN_TO_SCROLL = 6;

// Attendance helper: works for the rows/events your form sends
// (attendance: "yes" | "no" | "Hadir" | "Tidak Hadir", guests: number).
// Attending rows without a guest number count as 1 person.
const guestsOf = (w) => {
  const a = String(w.attendance ?? w.attending ?? w.kehadiran ?? "")
    .trim()
    .toLowerCase();
  const hadir = a !== "" && !/^(tidak|x|no|n$)/.test(a);
  return hadir ? Math.max(1, Number(w.guests ?? w.pax) || 1) : 0;
};

function Card({ wish }) {
  return (
    <article className={`uw-card${wish.fresh ? " is-fresh" : ""}`}>
      <span className="uw-avatar" aria-hidden="true">
        {(wish.name || "?").trim().charAt(0).toUpperCase()}
      </span>
      <div className="uw-body">
        <h3>{wish.name}</h3>
        <p>{wish.message}</p>
      </div>
    </article>
  );
}

function Column({ items, reverse, animate, dur }) {
  const list = animate ? [...items, ...items] : items;
  return (
    <div className={`uw-col${reverse ? " is-rev" : ""}`}>
      <div className="uw-track" style={{ "--dur": `${dur}s` }}>
        {list.map((w, i) => (
          <Card key={`${i}-${w.name}`} wish={w} />
        ))}
      </div>
    </div>
  );
}

function UcapanWall() {
  const [wishes, setWishes] = useState([]);
  const [serverHadir, setServerHadir] = useState(null); // total kehadiran from Apps Script
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cols, setCols] = useState(2);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 700px)");
    const update = () => setCols(mq.matches ? 1 : 2);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    let alive = true;
    fetch(SHEET_URL)
      .then((r) => r.json())
      .then((d) => {
        console.log("ucapan data:", d); // remove once everything works
        if (!alive) return;
        if (d.error) throw new Error(d.error);
        if (Array.isArray(d.wishes)) setWishes(d.wishes);
        if (typeof d.totalHadir === "number") setServerHadir(d.totalHadir);
      })
      .catch((err) => {
        console.error("ucapan error:", err);
        if (alive) setError(true);
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const onNew = (e) => {
      if (e.detail?.message) {
        setWishes((prev) => [e.detail, ...prev]);
        setServerHadir((t) => (t === null ? t : t + guestsOf(e.detail)));
      }
    };
    window.addEventListener("ucapan:new", onNew);
    return () => window.removeEventListener("ucapan:new", onNew);
  }, []);

  const animate = wishes.length >= MIN_TO_SCROLL;
  const colA = cols === 1 ? wishes : wishes.filter((_, i) => i % 2 === 0);
  const colB = cols === 1 ? [] : wishes.filter((_, i) => i % 2 === 1);
  const dur = (n) => Math.max(24, n * 7);

  // Total kehadiran: the script's totalHadir (counts every RSVP),
  // otherwise falls back to adding up the wishes loaded
  const count =
    serverHadir !== null
      ? serverHadir
      : wishes.reduce((sum, w) => sum + guestsOf(w), 0);

  return (
    <section className="uw" id="ucapan">
      <div className="uw-decor" aria-hidden="true">
        <span className="uw-ring" />
        <span className="uw-ring uw-ring--2" />
        <span className="uw-corner tl" />
        <span className="uw-corner tr" />
        <span className="uw-corner bl" />
        <span className="uw-corner br" />
        <span className="uw-leaf l1" />
        <span className="uw-leaf l2" />
        <span className="uw-leaf r1" />
        <span className="uw-leaf r2" />
        <i className="uw-spark s1">✦</i>
        <i className="uw-spark s2">✧</i>
        <i className="uw-spark s3">✦</i>
        <i className="uw-spark s4">✧</i>
        <i className="uw-spark s5">✦</i>
        <i className="uw-spark s6">✧</i>
      </div>

      <div className="uw-header">
        <p>Ucapan &amp; Doa</p>
        <h2>Dari Hati Tetamu</h2>
        <div className="uw-divider" aria-hidden="true">
          <span />
          <i>✦</i>
          <span />
        </div>

        {!loading && !error && count > 0 && (
          <div className="uw-counter" aria-live="polite">
            <strong>{count}</strong>
            <span>tetamu hadir</span>
          </div>
        )}
      </div>

      {loading && <p className="uw-empty">Memuatkan ucapan...</p>}

      {!loading && error && (
        <p className="uw-empty">Ucapan tidak dapat dimuatkan. Sila cuba lagi.</p>
      )}

      {!loading && !error && wishes.length === 0 && (
        <p className="uw-empty">
          Jadilah yang pertama meninggalkan ucapan untuk pengantin ✦
        </p>
      )}

      {wishes.length > 0 && (
        <div
          className={`uw-wall${animate ? "" : " is-static"}`}
          style={{ "--cols": cols }}
        >
          <Column items={colA} animate={animate} dur={dur(colA.length)} />
          {colB.length > 0 && (
            <Column items={colB} animate={animate} dur={dur(colB.length)} reverse />
          )}
        </div>
      )}
    </section>
  );
}

export default UcapanWall;  