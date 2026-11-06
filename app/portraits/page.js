"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaArrowRight, FaWhatsapp } from "react-icons/fa";
import { useArtModal } from "../../components/ArtModalContext";

const process = [
  {
    n: "01",
    title: "Get in touch",
    body: "Send a message with a few photographs and a brief about the person — who they are, what you want the portrait to hold. No brief is too small.",
  },
  {
    n: "02",
    title: "Conversation",
    body: "Nancy will come back to you directly. You'll discuss size, medium, mood, and any details that matter. Portraits are made to feel like the person, not just look like them.",
  },
  {
    n: "03",
    title: "Creation",
    body: "Work begins after a 50% deposit. Nancy paints at her own pace — intuitively, without rushing — until the portrait arrives at stillness.",
  },
  {
    n: "04",
    title: "Delivery",
    body: "The finished portrait is carefully packed and shipped with a certificate of authenticity, signed by Nancy. Available for collection from the studio in New Delhi.",
  },
];

const faqs = [
  { q: "What photographs work best?", a: "Clear, well-lit images where the subject's expression feels natural — not posed. Multiple photos help, but even one honest image is enough to begin." },
  { q: "Can I commission a portrait as a gift?", a: "Yes — portraits make deeply meaningful gifts. Nancy can coordinate directly with you so the recipient is surprised." },
  { q: "Do you do group portraits or families?", a: "Yes. Get in touch with what you have in mind and Nancy will advise on scale and composition." },
  { q: "How long does a portrait take?", a: "Turnaround depends on size and complexity. Typical portraits take 3–6 weeks from deposit. Nancy will give you a realistic timeline at the start." },
  { q: "What sizes are available?", a: "Portraits are typically made on canvas: 12×16 in, 18×24 in, 24×30 in, and larger on request. The right size depends on the space it will live in." },
  { q: "What medium do you use?", a: "Acrylic on canvas is the primary medium. Some portraits incorporate oil pastel or mixed media elements depending on the mood of the piece." },
];

export default function PortraitsPage() {
  const { openInquiry } = useArtModal();

  return (
    <div className="min-h-screen" style={{ background: "#FDFAF5" }}>
      <Navbar />

      {/* ── Hero ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ minHeight: "52vh" }}
      >
        <Image
          src="/avatar.webp"
          alt="Nancy Sikri — Portrait Commissions"
          fill
          className="object-cover object-top"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(10,8,6,0.85) 0%, rgba(10,8,6,0.45) 55%, rgba(10,8,6,0.1) 100%)",
          }}
        />

        <div
          className="absolute inset-0 flex flex-col justify-between px-8 md:px-14 py-12 md:py-16"
        >
          <p style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "0.58rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(201,169,110,0.55)",
          }}>
            Kala Samputah · Commission
          </p>

          <div>
            <div style={{ width: "2.5rem", height: "1px", background: "#C9A96E", marginBottom: "1.5rem" }} />
            <h1 style={{
              fontFamily: "'DM Serif Display', serif",
              fontWeight: 400,
              fontSize: "clamp(2.6rem, 6vw, 5.5rem)",
              lineHeight: 1.0,
              color: "#F5F0E8",
              letterSpacing: "0.01em",
            }}>
              Portraits
            </h1>
            <p style={{
              fontFamily: "'DM Serif Display', serif",
              fontStyle: "italic",
              fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
              color: "rgba(245,240,232,0.5)",
              marginTop: "1rem",
              lineHeight: 1.6,
              maxWidth: "38ch",
            }}>
              The one kind of commission Nancy takes on — capturing the presence of a person, not just the likeness.
            </p>
          </div>
        </div>
      </section>

      {/* ── About portraits ── */}
      <section className="py-16 md:py-24 px-6 md:px-10" style={{ background: "#FDFAF5" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_2fr] gap-10 md:gap-20 items-start">

          <div className="md:sticky md:top-28">
            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#8B7355",
              marginBottom: "1rem",
            }}>
              About portraits
            </p>
            <div style={{ width: "1.5rem", height: "1px", background: "#C9A96E" }} />
          </div>

          <div className="space-y-6">
            <p style={{
              fontFamily: "'DM Serif Display', serif",
              fontWeight: 400,
              fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
              lineHeight: 1.4,
              color: "#1C1C1C",
              letterSpacing: "0.01em",
            }}>
              "Alongside my abstract practice, I paint portraits. These are the one kind of work I take on commission."
            </p>

            <div style={{ height: "1px", background: "#E8DDD0" }} />

            <div style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(0.98rem, 2vw, 1.08rem)",
              lineHeight: 1.85,
              color: "#2A2A2A",
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
            }}>
              <p>
                Portraits are created from photographs or a sitting, and shaped to capture the person — not just their appearance. The goal is presence: the quality of someone that makes them themselves.
              </p>
              <p>
                Nancy brings the same intuitive approach to portraits as she does to her abstract work. Each portrait is painted with care, built in layers, and finished when it holds the person in the way it should.
              </p>
              <p style={{ fontStyle: "italic", color: "#8B7355" }}>
                Portraits make meaningful gifts and keepsakes — for weddings, milestones, memorials, or simply because someone deserves to be seen.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => openInquiry({
                  title: "Portrait Commission Inquiry",
                  src: "/avatar.webp",
                  artist: "Nancy Sikri",
                  medium: "Acrylic on Canvas",
                  size: "Custom Size",
                  year: new Date().getFullYear(),
                })}
                className="btn-dark inline-flex items-center justify-center gap-2.5 px-8 py-4"
              >
                Inquire about a portrait
                <FaArrowRight className="text-[10px]" />
              </button>
              <a
                href="https://wa.me/919818817291?text=Hello%20Nancy%2C%20I%20am%20interested%20in%20commissioning%20a%20portrait."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center justify-center gap-2 px-8 py-4"
              >
                <FaWhatsapp style={{ color: "#25D366" }} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-16 md:py-24 px-6 md:px-10" style={{ background: "#F5F0E8" }}>
        <div className="max-w-7xl mx-auto">

          <div className="mb-12 md:mb-16 text-center">
            <p className="section-title mb-2">How it works</p>
            <h2 style={{
              fontFamily: "'DM Serif Display', serif",
              fontWeight: 400,
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              color: "#1C1C1C",
            }}>
              Commissioning a portrait
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {process.map((step, i) => (
              <div
                key={step.n}
                className={`group relative px-0 md:px-8 py-8 ${
                  i > 0 ? "border-t border-[#E8DDD0] md:border-t-0 md:border-l md:border-[#E8DDD0]" : ""
                }`}
              >
                <p style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontWeight: 300,
                  fontSize: "3rem",
                  color: "rgba(201,169,110,0.25)",
                  lineHeight: 1,
                  marginBottom: "1.2rem",
                }}>
                  {step.n}
                </p>
                <h3 style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontWeight: 500,
                  fontSize: "1.15rem",
                  color: "#1C1C1C",
                  marginBottom: "0.6rem",
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "0.95rem",
                  lineHeight: 1.75,
                  color: "#6B5F55",
                }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 md:py-24 px-6 md:px-10" style={{ background: "#FDFAF5" }}>
        <div className="max-w-3xl mx-auto">

          <div className="text-center mb-12">
            <p className="section-title mb-2">Questions</p>
            <h2 style={{
              fontFamily: "'DM Serif Display', serif",
              fontWeight: 400,
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              color: "#1C1C1C",
            }}>
              Portrait FAQ
            </h2>
          </div>

          <div style={{ borderTop: "1px solid #E8DDD0" }}>
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group"
                style={{ borderBottom: "1px solid #E8DDD0" }}
              >
                <summary
                  className="flex items-start justify-between gap-6 py-6 cursor-pointer list-none"
                  style={{ outline: "none" }}
                >
                  <p style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontWeight: 400,
                    fontSize: "1.08rem",
                    color: "#1C1C1C",
                    lineHeight: 1.4,
                  }}>
                    {faq.q}
                  </p>
                  <span style={{
                    flexShrink: 0,
                    width: "1.4rem",
                    height: "1.4rem",
                    border: "1px solid #E8DDD0",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "0.15rem",
                    color: "#C9A96E",
                    fontSize: "0.85rem",
                    lineHeight: 1,
                  }}>
                    +
                  </span>
                </summary>
                <p style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontStyle: "italic",
                  fontSize: "0.98rem",
                  color: "#6B5F55",
                  lineHeight: 1.8,
                  paddingBottom: "1.5rem",
                  paddingRight: "2rem",
                }}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-16 md:py-20 px-6 md:px-10 border-t"
        style={{ background: "#1C1C1C", borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <p style={{
              fontFamily: "'DM Serif Display', serif",
              fontWeight: 400,
              fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
              lineHeight: 1.1,
              color: "#F5F0E8",
              marginBottom: "0.6rem",
            }}>
              Ready to begin?
            </p>
            <p style={{
              fontFamily: "'DM Serif Display', serif",
              fontStyle: "italic",
              fontSize: "1rem",
              color: "rgba(245,240,232,0.4)",
              lineHeight: 1.6,
              maxWidth: "38ch",
            }}>
              Send a message with a few photographs and a brief. Nancy will come back to you directly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <button
              onClick={() => openInquiry({
                title: "Portrait Commission",
                src: "/avatar.webp",
                artist: "Nancy Sikri",
                medium: "Acrylic on Canvas",
              })}
              className="btn-dark px-10 py-4 inline-flex items-center justify-center gap-2"
              style={{ background: "#C9A96E", color: "#111010" }}
            >
              Start an Inquiry
              <FaArrowRight className="text-[10px]" />
            </button>
            <a
              href="https://wa.me/919818817291?text=Hello%20Nancy%2C%20I%20would%20like%20to%20commission%20a%20portrait."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                background: "#25D366",
                color: "#fff",
                padding: "1rem 2rem",
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.68rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              <FaWhatsapp className="text-base" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
