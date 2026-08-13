import Link from "next/link";

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      href="/"
      className="inline-flex min-h-11 items-center gap-3 rounded-sm"
      aria-label="ТЕХДЕЛО 40 — на главную"
    >
      <svg
        aria-hidden="true"
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
      >
        <rect width="38" height="38" rx="8" fill={inverse ? "#DFFF43" : "#141713"} />
        <path
          d="M9 12H29M9 19H24M9 26H19"
          stroke={inverse ? "#141713" : "#DFFF43"}
          strokeWidth="4"
          strokeLinecap="square"
        />
      </svg>
      <span className="leading-none">
        <span className="block text-[15px] font-extrabold tracking-[-0.04em]">
          ТЕХДЕЛО
        </span>
        <span className={`mt-1 block text-[10px] font-bold tracking-[0.18em] ${inverse ? "text-white/60" : "text-muted"}`}>
          КАЛУГА · 40
        </span>
      </span>
    </Link>
  );
}
