"use client";

import { useState, useRef } from "react";
import Image from "next/image";

/**
 * ImageUploader
 * Props:
 *   value        {string}   — current image URL (from DB / state)
 *   onChange     {fn}       — called with new URL string after upload
 *   onPublicId   {fn}       — called with Cloudinary public_id (for deletion)
 *   label        {string}   — optional field label
 */
export default function ImageUploader({ value, onChange, onPublicId, label = "Image" }) {
  const [uploading, setUploading] = useState(false);
  const [error,     setError]     = useState("");
  const [preview,   setPreview]   = useState(value || "");
  const inputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;

    // Validate type & size (max 10 MB)
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.type)) {
      setError("Only JPG, PNG, WEBP or GIF allowed.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File must be under 10 MB.");
      return;
    }

    setError("");
    setUploading(true);

    try {
      const form = new FormData();
      form.append("file", file);

      const res  = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();

      if (!res.ok) { setError(data.error || "Upload failed"); return; }

      setPreview(data.url);
      onChange?.(data.url);
      onPublicId?.(data.publicId);

    } catch (err) {
      setError("Network error during upload.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  const handleChange = (e) => {
    handleFile(e.target.files?.[0]);
  };

  return (
    <div>
      {/* Label */}
      <span style={{
        fontFamily: "'Jost', sans-serif",
        fontSize: "0.58rem",
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "rgba(245,240,232,0.35)",
        display: "block",
        marginBottom: "0.5rem",
      }}>
        {label}
      </span>

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        style={{
          border: `1.5px dashed ${uploading ? "#C9A96E" : "rgba(255,255,255,0.1)"}`,
          borderRadius: "8px",
          padding: preview ? "0" : "1.8rem 1rem",
          cursor: uploading ? "wait" : "pointer",
          transition: "border-color 0.2s ease",
          background: "rgba(255,255,255,0.02)",
          overflow: "hidden",
          position: "relative",
        }}
        onMouseEnter={e => !uploading && (e.currentTarget.style.borderColor = "rgba(201,169,110,0.4)")}
        onMouseLeave={e => !uploading && (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
      >
        {preview ? (
          /* Preview */
          <div style={{ position: "relative" }}>
            <div style={{ position: "relative", width: "100%", aspectRatio: "3/2" }}>
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover"
                style={{ borderRadius: "6px" }}
              />
            </div>
            {/* Change overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0,
                transition: "opacity 0.2s ease",
                borderRadius: "6px",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = 1)}
              onMouseLeave={e => (e.currentTarget.style.opacity = 0)}
            >
              <span style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#F5F0E8",
                background: "rgba(0,0,0,0.6)",
                padding: "0.4rem 1rem",
                borderRadius: "4px",
              }}>
                Change image
              </span>
            </div>
          </div>
        ) : uploading ? (
          /* Uploading state */
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem" }}>
            <div style={{
              width: "32px", height: "32px", border: "2px solid rgba(201,169,110,0.3)",
              borderTopColor: "#C9A96E", borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }} />
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem", color: "#C9A96E", letterSpacing: "0.15em" }}>
              Uploading…
            </p>
          </div>
        ) : (
          /* Empty state */
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(201,169,110,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem", color: "rgba(245,240,232,0.35)", letterSpacing: "0.12em", textAlign: "center" }}>
              Drop image here or click to browse
            </p>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.55rem", color: "rgba(245,240,232,0.2)", letterSpacing: "0.1em" }}>
              JPG · PNG · WEBP · max 10 MB
            </p>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </div>

      {/* Error */}
      {error && (
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.68rem", color: "#e57373", marginTop: "0.4rem", letterSpacing: "0.06em" }}>
          {error}
        </p>
      )}

      {/* Current URL (readonly, copy-friendly) */}
      {preview && (
        <p style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: "0.55rem",
          color: "rgba(245,240,232,0.2)",
          marginTop: "0.4rem",
          letterSpacing: "0.04em",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}>
          {preview}
        </p>
      )}

      {/* Spin keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
