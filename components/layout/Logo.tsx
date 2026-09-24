import { siteConfig } from "@/lib/site.config";
import { cn } from "@/lib/utils";

/**
 * Wordmark + ribbon mark. The mark is the brand's ribbon "b" (public/logo-mark.png).
 */
export function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const [first, second] = siteConfig.brand.nameLines;
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-mark.png"
        alt=""
        aria-hidden="true"
        width={20}
        height={30}
        className="h-[30px] w-auto shrink-0"
      />
      {!compact && (
        <span className="t-label whitespace-nowrap text-[0.74rem] leading-none tracking-[0.16em] sm:text-[0.8rem] sm:tracking-[0.2em]">
          {first.toUpperCase()}
          <span className="text-accent"> {second.toUpperCase()}</span>
        </span>
      )}
    </span>
  );
}
