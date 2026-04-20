import type { ReactNode } from "react";

export const metadata = {
  title: "Open Case Memory",
  description: "Reusable case precedents for AI agents."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
