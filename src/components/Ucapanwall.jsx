import { useEffect, useState } from "react";
import "./Ucapanwall.css";

const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbygfTCV5UJ-JyxKR9-OukSa_wZVy2IQjrEsfCy3Ag4DwdGo4yQzKAbxE2kbKJtI8YLD/exec";

const MIN_TO_SCROLL = 6;

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
  const [loading, setLoading] = useState(true);
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
        if (alive && Array.isArray(d.wishes)) setWishes(d.wishes);
      })
      .catch(() => {})
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const onNew = (e) => {
      if (e.detail?.message) setWishes((prev) => [e.detail, ...prev]);
    };
    window.addEventListener("ucapan:new", onNew);
    return () => window.removeEventListener("ucapan:new", onNew);
  }, []);

  const animate = wishes.length >= MIN_TO_SCROLL;
  const colA = cols === 1 ? wishes : wishes.filter((_, i) => i % 2 === 0);
  const colB = cols === 1 ? [] : wishes.filter((_, i) => i % 2 === 1);
  const dur = (n) => Math.max(24, n * 7);

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
      </div>

      {loading && <p className="uw-empty">Memuatkan ucapan...</p>}

      {!loading && wishes.length === 0 && (
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