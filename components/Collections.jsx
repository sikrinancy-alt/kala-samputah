"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCachedArtworks } from "../lib/artworksCache";
import { primarySrc } from "../lib/artworkViews";

const CATEGORY_LABELS = ["Paintings", "Prints", "Photography"];

export default function Collections() {
  const [covers,  setCovers]  = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCachedArtworks().then((artworks) => {
      if (artworks && artworks.length > 0) {
        // Use first artwork of each category as cover
        const map = {};
        CATEGORY_LABELS.forEach((label) => {
          const match = artworks.find((a) => {
            const cat = (a.category?.name || a.category || "").toLowerCase();
            return cat === label.toLowerCase();
          });
          if (match) map[label] = primarySrc(match);
        });
        setCovers(map);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // If no artworks uploaded at all, skip the section entirely
  if (!loading && Object.keys(covers).length === 0) return null;

  return (
    <section className="py-16 md:py-20 px-4 md:px-10 bg-brand-beige">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-10 md:mb-14">
          <p className="section-title mb-3">Browse By</p>
          <h2
            className="text-brand-dark text-3xl md:text-5xl"
            style={{ fontFamily: 'BeausiteFit, "SF Pro Display", sans-serif', fontWeight: 300, letterSpacing: "0.1em" }}
          >
            COLLECTIONS
          </h2>
          <div className="divider w-24 mx-auto mt-4" />
        </div>

        <div className="flex md:grid md:grid-cols-3 gap-3 md:gap-4 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
          {CATEGORY_LABELS.map((label) => {
            const src = covers[label];
            return (
              <Link
                key={label}
                href={`/collect?category=${label}`}
                className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden group cursor-pointer flex-shrink-0 w-[75%] md:w-auto snap-start rounded-lg md:rounded-none"
                style={{ textDecoration: "none" }}
              >
                {src ? (
                  <Image
                    src={src}
                    alt={label}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 75vw, 33vw"
                    className="object-cover img-zoom"
                  />
                ) : loading ? (
                  <div className="skeleton w-full h-full" />
                ) : (
                  /* No artwork uploaded for this category yet */
                  <div className="w-full h-full bg-brand-sand/40 flex items-center justify-center">
                    <span style={{ fontFamily: '"SF Pro Display", sans-serif', fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8B7355" }}>
                      Coming soon
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 category-overlay transition-opacity duration-500 group-hover:opacity-80" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute inset-0 flex items-end justify-start p-6 md:p-8">
                  <div>
                    <p className="text-white tracking-[0.28em] uppercase mb-2"
                      style={{ fontFamily: '"SF Pro Display", sans-serif', fontWeight: 300, fontSize: "0.85rem" }}>
                      {label}
                    </p>
                    <div className="w-8 h-[1px] bg-white/60 group-hover:w-16 transition-all duration-500" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
