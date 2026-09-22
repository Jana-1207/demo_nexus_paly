"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { galleryCategories, galleryItems, type GalleryCategory } from "@/data/gallery";
import { gsap, motionFactor, useGsapContext } from "@/lib/motion";
import { SectionHead } from "@/components/ui/SectionHead";
import { Lightbox } from "./Lightbox";
import { photo, cn } from "@/lib/utils";

const SPAN: Record<string, string> = {
  tall: "row-span-3",
  wide: "col-span-2 row-span-2",
  square: "row-span-2",
};

export function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const visible = useMemo(
    () =>
      filter === "All"
        ? galleryItems
        : galleryItems.filter((item) => item.category === filter),
    [filter]
  );

  // Re-entry animation after a filter change.
  useGsapContext(
    () => {
      const grid = gridRef.current;
      if (!grid) return;
      const f = motionFactor();
      gsap.fromTo(
        grid.children,
        { opacity: 0, y: 18 * f, scale: f > 0 ? 0.985 : 1 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: f === 0 ? 0.25 : 0.6,
          ease: "power3.out",
          stagger: 0.035,
          overwrite: true,
        }
      );
    },
    gridRef,
    [filter]
  );

  return (
    <section id="gallery" className="section" aria-labelledby="gallery-title">
      <div className="shell">
        <SectionHead
          id="gallery-title"
          index="05"
          eyebrow="Inside the arena"
          titleLines={["The Floor,", "Unfiltered"]}
          body="Shot on regular nights — no staging, no borrowed hardware. What you see is what is bolted to our floor."
        />

        {/* Filters */}
        <div
          className="mt-11 flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter gallery by category"
        >
          {galleryCategories.map((category) => {
            const isActive = filter === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                aria-pressed={isActive}
                className={cn(
                  "btn btn-sm !min-h-10 rounded-full border transition-colors duration-300",
                  isActive
                    ? "border-transparent bg-[var(--btn-bg)] text-[var(--btn-text)]"
                    : "border-line text-ink-2 hover:border-line-strong hover:text-ink"
                )}
              >
                {category}
                <span className="t-meta ml-1 !text-[0.6rem] opacity-60">
                  {category === "All"
                    ? galleryItems.length
                    : galleryItems.filter((i) => i.category === category).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mosaic */}
        <div
          ref={gridRef}
          className="mt-7 grid grid-cols-2 gap-3 [grid-auto-flow:dense] [grid-auto-rows:5.5rem] sm:[grid-auto-rows:7rem] md:grid-cols-3 lg:grid-cols-4 lg:gap-4 lg:[grid-auto-rows:8rem]"
        >
          {visible.map((item, i) => (
            <button
              key={item.id}
              type="button"
              data-cursor="view"
              onClick={() => setOpenIndex(i)}
              className={cn(
                "group media media-zoom relative overflow-hidden rounded-[var(--r-sm)] border border-line",
                "transition-colors duration-500 hover:border-line-strong",
                SPAN[item.shape]
              )}
              aria-label={`Open image: ${item.caption}`}
            >
              <Image
                src={photo(item.src, 900, 70)}
                alt={item.alt}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "var(--img-veil)" }}
              />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 translate-y-2 p-3 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
              >
                <span className="t-meta block !text-white/60">{item.category}</span>
                <span className="t-label mt-1 block text-[0.7rem] text-white">
                  {item.caption}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        items={visible}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />
    </section>
  );
}
