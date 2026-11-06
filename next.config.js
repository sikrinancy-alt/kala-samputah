/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,   // avoids 404 errors for any remaining local/missing images
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/gjiimeef/**",
      },
      {
        protocol: "https",
        hostname: "www.artisera.com",
        pathname: "/cdn/**",
      },
    ],
  },

  async headers() {
    return [
      {
        // Apply to every route
        source: "/:path*",
        headers: [
          // Prevent the page from being embedded in iframes (clickjacking)
          { key: "X-Frame-Options",        value: "SAMEORIGIN" },
          // Stop browsers from guessing MIME types
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Only send referrer on same origin
          { key: "Referrer-Policy",        value: "strict-origin-when-cross-origin" },
          // Force HTTPS for 1 year (applied properly once deployed to HTTPS)
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          // Block XSS in older browsers
          { key: "X-XSS-Protection",       value: "1; mode=block" },
          // Restrict powerful browser features we don't need
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Scripts: self + Next.js inline scripts
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              // Styles: self + Google Fonts + inline Tailwind
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Fonts: self + Google Fonts CDN
              "font-src 'self' https://fonts.gstatic.com",
              // Images: self + Cloudinary + Artisera CDN + data URIs
              "img-src 'self' data: blob: https://res.cloudinary.com https://www.artisera.com",
              // API calls: self + WhatsApp + Brevo
              "connect-src 'self' https://api.brevo.com https://wa.me",
              // No iframes from external sources
              "frame-src 'none'",
              // No plugins (Flash etc.)
              "object-src 'none'",
              // Form submissions only to self
              "form-action 'self'",
              // Upgrade any accidental HTTP requests
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
      {
        // API routes — extra no-cache headers to prevent sensitive data caching
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate, proxy-revalidate" },
          { key: "Pragma",        value: "no-cache"  },
          { key: "Expires",       value: "0"         },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
