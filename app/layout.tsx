
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TrendWear Assist | Fashion Customer Assistant",
  description: "Your personal guide to clothing, fit, fabrics and care."
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer
          style={{
            textAlign: "center",
            padding: "24px",
            marginTop: "40px",
            borderTop: "1px solid #e5e5e5",
            color: "#777",
            fontSize: "14px",
          }}
        >
          © 2026 TrendWear Assist. Built with ChatGPT
        </footer>
      </body>
    </html>
  );
}
