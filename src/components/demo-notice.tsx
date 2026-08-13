import { FlaskConical } from "lucide-react";

export function DemoNotice() {
  return (
    <div className="bg-ink text-white">
      <div className="container-shell flex min-h-9 items-center justify-center gap-2 py-2 text-center text-[11px] font-bold tracking-[0.04em] text-white/75 sm:text-xs">
        <FlaskConical aria-hidden="true" className="h-4 w-4 text-signal" />
        <span>CONCEPT / DEMO PROJECT · компания, парк и условия вымышлены</span>
      </div>
    </div>
  );
}
