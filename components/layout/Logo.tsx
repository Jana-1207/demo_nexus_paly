import { siteConfig } from "@/lib/site.config";
import { cn } from "@/lib/utils";

/**
 * Wordmark + geometric mark. The mark is a chevron pair reading as an "N",
 * cut from a single stroke so it holds up at 20 px.
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
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="shrink-0 overflow-visible"
      >
        <path
          d="M3 20V4l9 11.2V4"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path
          d="M15.5 4.6v14.8L21 15.6V8.4z"
          fill="var(--accent)"
          stroke="none"
        />
      </svg>
      {!compact && (
        <span className="t-label whitespace-nowrap text-[0.74rem] leading-none tracking-[0.16em] sm:text-[0.8rem] sm:tracking-[0.2em]">
          {first.toUpperCase()}
          <span className="text-accent"> {second.toUpperCase()}</span>
        </span>
      )}
    </span>
  );
}
