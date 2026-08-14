import type { NextConfig } from "next";

// Cabeceras de seguridad estáticas. El portal es público y no maneja
// autenticación (ver README/spec: "El portal NO debe tener autenticación de
// usuarios"), pero igual aplica buenas prácticas básicas de cabeceras HTTP.
// El CSP con nonce por request se genera en middleware.ts.
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
