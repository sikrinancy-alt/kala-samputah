"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause } from "react-icons/fa";
import { useSiteContent } from "./SiteContentContext";
import { heroSlides } from "./data";
import { getCachedArtworks } from "../lib/artworksCache";
import { primarySrc, optimizeImageUrl } from "../lib/artworkViews";

export default function HeroSlider() {
  const { content, loaded: contentLoaded } = useSiteContent();
  const [slides, setSlides] = useState(heroSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying]       = useState(true);
  const [loadedSrc, setLoadedSrc] = useState(null);

  useEffect(() => {
    if (!contentLoaded) return;

    // Admin-configured hero slides take priority
    const configuredSlides = Array.isArray(content?.hero?.slides)
      ? content.hero.slides
          .filter((slide) => typeof slide?.src === "string" && slide.src.trim())
          .map((slide) => ({
            ...slide,
            src: optimizeImageUrl(slide.src, 1600),
          }))
      : [];

    if (configuredSlides.length) {
      setSlides((prev) => {
        const isSame =
          prev.length === configuredSlides.length &&
          prev.every((p, idx) => p.src === configuredSlides[idx]?.src);
        return isSame ? prev : configuredSlides;
      });
      return;
    }

    // Otherwise use featured artworks as slides
    let cancelled = false;
    getCachedArtworks().then((artworks) => {
      if (cancelled) return;
      const featured = artworks?.filter((artwork) => artwork.featured);
      const candidates = featured?.length ? featured : artworks || [];
      const formatted = candidates
        .map((artwork) => ({
          src: optimizeImageUrl(primarySrc(artwork), 1600),
          label: artwork.title || "Original Work",
        }))
        .filter((slide) => slide.src)
        .slice(0, 4);

      if (formatted.length) {
        setSlides((prev) => {
          const isSame =
            prev.length === formatted.length &&
            prev.every((p, idx) => p.src === formatted[idx]?.src);
          return isSame ? prev : formatted;
        });
      }
    }).catch(() => {
      if (!cancelled) setSlides(heroSlides);
    });

    return () => {
      cancelled = true;
    };
  }, [content?.hero?.slides, contentLoaded]);

  useEffect(() => {
    if (!isPlaying || slides.length === 0) return;
    const t = setInterval(() => setCurrentSlide(p => (p + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [isPlaying, slides.length]);

  const nextSlide = () => setCurrentSlide(p => (p + 1) % slides.length);
  const prevSlide = () => setCurrentSlide(p => (p - 1 + slides.length) % slides.length);

  // No slides yet — show a minimal dark placeholder
  if (slides.length === 0) {
    return (
      <section className="relative w-full h-[62vh] md:h-[88vh] overflow-hidden bg-brand-dark flex items-end px-8 md:px-16 pb-12">
        <div>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.62rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(201,169,110,0.55)", marginBottom: "1rem" }}>
            Kala Samputah
          </p>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 300, fontSize: "clamp(2rem, 6vw, 5rem)", lineHeight: 1.05, color: "#F5F0E8", letterSpacing: "0.02em" }}>
            Original Art by<br />Nancy Sikri
          </h2>
        </div>
      </section>
    );
  }

  const activeSlide = slides[currentSlide] || slides[0];

  return (
    <section
      className="relative w-full h-[62vh] md:h-[88vh] overflow-hidden bg-brand-dark"
    >
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.label}
            fill
            sizes="100vw"
            className={`object-cover ${i === currentSlide ? "ken-burns" : ""}`}
            priority={i === 0}
            fetchPriority={i === 0 ? "high" : "auto"}
            style={{
              opacity: i === 0 || loadedSrc === slide.src ? 1 : 0,
              transition: "opacity 700ms ease",
            }}
            onLoad={() => setLoadedSrc(slide.src)}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 75% 70% at 0% 100%, rgba(0,0,0,0.48) 0%, rgba(0,0,0,0.26) 42%, transparent 100%)",
            }}
          />
        </div>
      ))}

      {/* Bottom label */}
      <div className="absolute bottom-10 left-8 md:left-16 z-10">
        <p className="section-title mb-1" style={{ color: "rgba(255,255,255,0.65)" }}>
          {activeSlide.label}
        </p>
        <h2
          className="text-white text-3xl md:text-6xl"
          style={{ fontFamily: 'BeausiteFit, "SF Pro Display", sans-serif', fontWeight: 300, lineHeight: 1.1 }}
        >
          Original Art by<br />Nancy Sikri
        </h2>
      </div>

          {/* Prev arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-11 md:h-11 border border-white/40 flex items-center justify-center text-white hover:bg-white/10 transition-all"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="text-xs" />
          </button>

          {/* Next arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-11 md:h-11 border border-white/40 flex items-center justify-center text-white hover:bg-white/10 transition-all"
            aria-label="Next slide"
          >
            <FaChevronRight className="text-xs" />
          </button>

          {/* Play/Pause */}
          <button
            onClick={() => setIsPlaying(v => !v)}
            className="absolute top-5 right-5 z-10 w-8 h-8 border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-all"
            aria-label="Play or pause slideshow"
          >
            {isPlaying ? <FaPause className="text-[10px]" /> : <FaPlay className="text-[10px]" />}
          </button>

          {/* Dot indicators (GPU-composited transform/opacity) */}
          <div className="absolute bottom-10 right-8 md:right-16 z-10 flex gap-2 items-center">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-[2px] w-6 transition-[transform,opacity] duration-300 origin-left ${
                  i === currentSlide ? "scale-x-100 opacity-100 bg-white" : "scale-x-[0.35] opacity-40 bg-white"
                }`}
                style={{ willChange: "transform" }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
    </section>
  );
}
