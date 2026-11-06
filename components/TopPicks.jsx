"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaSearchPlus } from "react-icons/fa";
import { useArtModal } from "./ArtModalContext";
import { getCachedArtworks } from "../lib/artworksCache";
import { primarySrc, angleViews } from "../lib/artworkViews";

function getCardStyle(offset) {
  const abs = Math.abs(offset);
  if (offset === 0) return { transform: "translateX(0) scale(1)", zIndex: 10, opacity: 1 };
  const dir    = offset > 0 ? 1 : -1;
  const shiftX = dir * (abs === 1 ? 52 : abs === 2 ? 86 : 110);
  const scale  = abs === 1 ? 0.82 : abs === 2 ? 0.68 : 0.58;
  const rotate = dir * (abs === 1 ? 4 : abs === 2 ? 7 : 9);
  return {
    transform: `translateX(${shiftX}%) scale(${scale}) rotate(${rotate}deg)`,
    zIndex: 10 - abs,
    opacity: abs > 2 ? 0 : abs === 2 ? 0.55 : 0.85,
  };
}

export default function TopPicks() {
  const [active,   setActive]   = useState(0);
  const [workList, setWorkList] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const { openArtwork, openInquiry } = useArtModal();

  useEffect(() => {
    getCachedArtworks().then((artworks) => {
      if (artworks && artworks.length > 0) {
        const source = artworks.filter(a => a.featured).length > 0
          ? artworks.filter(a => a.featured)
          : artworks;
        const formatted = source.map((a) => ({
          id:       a._id,
          _id:      a._id,
          title:    a.title,
          artist:   a.artist   || "Nancy Sikri",
          subtitle: a.story    || a.description || "Original studio piece",
          medium:   a.medium   || "Mixed Media on Canvas",
          size:     a.dimensions || a.size || "",
          year:     a.year     || new Date().getFullYear(),
          color:    a.color    || "Amber",
          src:      primarySrc(a),
          views:    angleViews(a),
        }));
        setWorkList(formatted.slice(0, 5));
        setActive(Math.min(2, Math.floor(formatted.length / 2)));
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const prev = () => setActive(p => Math.max(0, p - 1));
  const next = () => setActive(p => Math.min(workList.length - 1, p + 1));

  const handleCardClick = (i, isCenter, pick) => {
    if (isCenter) openArtwork(pick);
    else setActive(i);
  };

  if (!loading && workList.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-brand-cream overflow-hidden">
      <div className="text-center mb-12 md:mb-16">
        <h2 style={{ fontFamily: 'BeausiteFit, "SF Pro Display", sans-serif', fontWeight: 400, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#1C1C1C", letterSpacing: "0.01em" }}>
          Today's top picks
        </h2>
        <p className="text-xs text-brand-muted font-sans mt-2 tracking-wide">
          Tap active card to inspect texture with lens zoom
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center gap-4 h-[300px] items-center">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="skeleton rounded-2xl flex-shrink-0"
              style={{ width: i === 1 ? "200px" : "150px", height: i === 1 ? "280px" : "200px", opacity: i === 1 ? 1 : 0.5 }} />
          ))}
        </div>
      ) : (
        <div className="relative flex items-center justify-center h-[300px] sm:h-[360px] md:h-[420px]">
          <button onClick={prev} disabled={active === 0} aria-label="Previous"
            className="absolute left-3 z-20 w-8 h-8 flex items-center justify-center rounded-full border border-brand-sand/60 bg-white/80 text-brand-dark disabled:opacity-30 transition-opacity md:hidden"
            style={{ top: "50%", transform: "translateY(-50%)" }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M7.5 2L4 6l3.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button onClick={next} disabled={active === workList.length - 1} aria-label="Next"
            className="absolute right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full border border-brand-sand/60 bg-white/80 text-brand-dark disabled:opacity-30 transition-opacity md:hidden"
            style={{ top: "50%", transform: "translateY(-50%)" }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2L8 6l-3.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          {workList.map((pick, i) => {
            const offset   = i - active;
            const style    = getCardStyle(offset);
            const isCenter = offset === 0;
            return (
              <div key={pick._id || i} onClick={() => handleCardClick(i, isCenter, pick)}
                className="absolute cursor-pointer w-[170px] h-[240px] sm:w-[210px] sm:h-[290px] md:w-[260px] md:h-[360px]"
                style={{ transition: "transform 0.5s cubic-bezier(0.34,1.2,0.64,1), opacity 0.4s ease", ...style }}>
                <div className="relative w-full h-full overflow-hidden group"
                  style={{ borderRadius: "16px", boxShadow: isCenter ? "0 24px 60px rgba(28,28,28,0.28)" : "0 8px 24px rgba(28,28,28,0.14)" }}>
                  <Image src={pick.src} alt={pick.title} fill className="object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(28,28,28,0.85) 0%, rgba(28,28,28,0.2) 50%, transparent 100%)" }} />
                  {isCenter && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full flex items-center gap-1.5 shadow"
                      style={{ background: "rgba(28,28,28,0.7)", backdropFilter: "blur(6px)", fontSize: "0.72rem", color: "#F5F0E8", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
                      <FaSearchPlus className="text-brand-accent text-[10px]" />
                      <span>Click to Zoom</span>
                    </div>
                  )}
                  {isCenter && (
                    <div className="absolute bottom-4 left-4 right-4 text-left">
                      <p style={{ fontWeight: 600, fontSize: "1.05rem", color: "#FFFFFF", lineHeight: 1.2, marginBottom: "0.2rem" }}>{pick.title}</p>
                      <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.75)", fontStyle: "italic", marginBottom: "0.6rem" }}>{pick.subtitle}</p>
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={(e) => { e.stopPropagation(); openInquiry(pick); }}
                          className="px-2.5 py-1 bg-brand-accent hover:bg-white text-brand-dark text-[0.62rem] tracking-wider uppercase font-sans font-semibold rounded transition-colors">
                          Inquire
                        </button>
                        <button type="button" onClick={(e) => { e.stopPropagation(); openArtwork(pick); }}
                          className="px-2.5 py-1 bg-white/20 hover:bg-white/40 text-white text-[0.62rem] tracking-wider uppercase font-sans rounded transition-colors backdrop-blur-sm">
                          Macro View
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!loading && workList.length > 0 && (
        <div className="flex justify-center gap-2 mt-8">
          {workList.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} aria-label={`Pick ${i + 1}`}
              style={{ width: i === active ? "1.5rem" : "0.4rem", height: "0.25rem", borderRadius: "999px", background: i === active ? "#1C1C1C" : "#C9A96E", border: "none", cursor: "pointer", transition: "width 0.3s ease", padding: 0 }} />
          ))}
        </div>
      )}
    </section>
  );
}
