"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import ArtCard from "./ArtCard";
import { getCachedArtworks } from "../lib/artworksCache";
import { primarySrc, angleViews } from "../lib/artworkViews";

export default function NewArrivals() {
  const [works,   setWorks]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCachedArtworks().then((artworks) => {
      if (artworks && artworks.length > 0) {
        const formatted = artworks.map((a) => ({
          id:       a._id,
          _id:      a._id,
          title:    a.title,
          artist:   a.artist   || "Nancy Sikri",
          medium:   a.medium   || "Mixed Media on Canvas",
          size:     a.dimensions || a.size || "",
          price:    a.price,
          year:     a.year     || new Date().getFullYear(),
          color:    a.color    || "Neutral",
          category: a.category?.name || a.category || "Paintings",
          src:      primarySrc(a),
          views:    angleViews(a),
          featured: a.featured,
        }));
        setWorks(formatted.slice(0, 4));
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // Nothing to show yet
  if (!loading && works.length === 0) return null;

  return (
    <section className="py-16 md:py-24 px-4 md:px-10 bg-brand-cream">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <p className="section-title mb-3">Just In</p>
          <h2
            className="text-brand-dark text-3xl md:text-5xl"
            style={{ fontFamily: 'BeausiteFit, "SF Pro Display", sans-serif', fontWeight: 300, letterSpacing: "0.1em" }}
          >
            NEW ARRIVALS
          </h2>
          <div className="divider w-24 mx-auto mt-4" />
        </div>

        {loading ? (
          /* Skeleton */
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="skeleton aspect-[3/4] w-full" />
                <div className="skeleton h-3 w-3/4" />
                <div className="skeleton h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {works.map((art, i) => (
              <ArtCard key={art._id || i} {...art} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/collect" className="btn-dark inline-flex items-center gap-3 px-10 py-4">
            VIEW NEW ARRIVALS
            <FaArrowRight className="text-[10px]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
