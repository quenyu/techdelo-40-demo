import Link from "next/link";
import { Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function MobileCta({ equipment }: { equipment?: string }) {
  const href = equipment ? `/request?equipment=${encodeURIComponent(equipment)}` : "/request";
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 p-3 shadow-[0_-8px_24px_rgb(20_23_19_/_0.12)] backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-md gap-2">
        <a href={siteConfig.phoneHref} aria-label="Позвонить диспетчеру" className="grid h-13 w-13 shrink-0 place-items-center rounded-md border border-line bg-white">
          <Phone aria-hidden="true" className="h-5 w-5" />
        </a>
        <Link href={href} className="btn-primary flex-1">
          Проверить доступность
        </Link>
      </div>
    </div>
  );
}
