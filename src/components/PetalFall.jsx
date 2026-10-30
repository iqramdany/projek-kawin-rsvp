import { useMemo } from "react";
import "./PetalFall.css";

/* Kelopak mawar gugur di seluruh skrin (halus, tak ganggu sentuhan)
   - COUNT   : bilangan kelopak (telefon guna separuh melalui CSS)
   - nilai lain dikira tetap supaya tak berubah setiap render */
const COUNT = 18;

function PetalFall() {
  const petals = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => {
        const rnd = (n) => {
          const x = Math.sin((i + 1) * 12.9898 + n * 78.233) * 43758.5453;
          return x - Math.floor(x);
        };
        return {
          left: rnd(1) * 100, // % dari kiri
          size: 9 + rnd(2) * 9, // px
          dur: 14 + rnd(3) * 12, // saat jatuh
          delay: -rnd(4) * 26, // negatif = sudah berada di skrin
          sway: 18 + rnd(5) * 34, // px goyang kiri-kanan
          swayDur: 4 + rnd(6) * 4,
          drift: (rnd(7) - 0.5) * 120, // px hanyut ke tepi
          rot: rnd(8) * 360,
          opacity: 0.28 + rnd(9) * 0.27, // 0.28 - 0.55 (halus)
          kind: i % 3, // 3 warna
        };
      }),
    []
  );

  return (
    <div className="pf" aria-hidden="true">
      {petals.map((p, i) => (
        <span
          key={i}
          className={`pf-petal k${p.kind}${i % 2 ? " is-extra" : ""}`}
          style={{
            left: `${p.left}%`,
            "--size": `${p.size}px`,
            "--drift": `${p.drift}px`,
            "--op": p.opacity,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <i
            style={{
              "--sway": `${p.sway}px`,
              "--r0": `${p.rot}deg`,
              animationDuration: `${p.swayDur}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        </span>
      ))}
    </div>
  );
}

export default PetalFall;
