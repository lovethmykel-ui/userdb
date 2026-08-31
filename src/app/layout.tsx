import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OKNexus — Pro Exchange & Institutional Multi-Asset Terminal",
  description: "Next.js & React institutional cryptocurrency exchange featuring instant conversion, corridor on/off-ramps, OTC block desk, live orderbook, and cold storage custody.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full antialiased" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
        {children}
      </body>
    </html>
  );
}
