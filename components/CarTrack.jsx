import { HEADLINE } from "../lib/config";

// One layer of the letter-spaced headline. Letters are separate spans so GSAP can stagger them.
function Headline({ className, hidden = false }) {
  return (
    <div
      aria-hidden={hidden || undefined}
      className={`${className} absolute inset-0 flex items-center justify-center whitespace-nowrap text-[clamp(1.1rem,5.2vw,4.5rem)] font-extrabold tracking-[0.35em]`}
    >
      {!hidden && <span className="sr-only">{HEADLINE}</span>}
      <h1 className="m-0 pl-[0.35em] text-[inherit] font-[inherit]" aria-hidden="true">
        {HEADLINE.split("").map((ch, i) =>
          ch === " " ? (
            <span key={i} className="inline-block w-[0.7em]" />
          ) : (
            <span key={i} className="hl-letter">{ch}</span>
          )
        )}
      </h1>
    </div>
  );
}

// Top-down car (inline SVG, facing right).
function CarSvg() {
  return (
    <svg viewBox="0 0 320 140" className="block h-auto w-full" aria-hidden="true">
      <ellipse cx="160" cy="76" rx="150" ry="58" fill="#000" opacity=".35" />
      {[[48, 2], [214, 2], [48, 122], [214, 122]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="52" height="16" rx="6" fill="#0b0b0b" />
      ))}
      <rect x="8" y="14" width="304" height="112" rx="48" fill="var(--accent)" />
      <rect x="248" y="58" width="52" height="24" rx="8" fill="#000" opacity=".15" />
      <rect x="96" y="28" width="130" height="84" rx="26" fill="#0f1114" />
      <path d="M226 34 L256 46 Q262 70 256 94 L226 106 Z" fill="#9fe7ff" opacity=".85" />
      <path d="M96 38 L78 49 Q74 70 78 91 L96 102 Z" fill="#9fe7ff" opacity=".6" />
      <rect x="300" y="30" width="10" height="20" rx="4" fill="#fff7c2" />
      <rect x="300" y="90" width="10" height="20" rx="4" fill="#fff7c2" />
      <rect x="8" y="30" width="8" height="20" rx="3" fill="#ff3b3b" />
      <rect x="8" y="90" width="8" height="20" rx="3" fill="#ff3b3b" />
    </svg>
  );
}

export default function CarTrack() {
  return (
    <div className="relative h-[clamp(150px,28vw,320px)] w-full overflow-hidden border-y border-white/10 bg-[#0d0d12]">
      {/* dashed road line (moves with scroll) */}
      <div className="road-lines absolute left-0 top-1/2 h-[3px] w-[300vw] -translate-y-1/2 opacity-60" />
      <Headline className="hl-base" hidden />
      <Headline className="hl-fill" hidden />
      {/* the car: x/y are driven by GSAP, so no CSS transform here */}
      <div className="car absolute left-0 top-1/2 w-[clamp(140px,22vw,320px)]">
        <CarSvg />
      </div>
    </div>
  );
}
