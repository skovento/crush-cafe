import "./globals.css";
import SmoothScrollProvider from "./components/SmoothScrollProvider";

export const metadata = {
  title: "Crush Cafe & Restro — Late-night cafe on Netaji Road, Ahmedabad",
  description:
    "A 5.0-rated late-night cafe on Netaji Road by GLS College, Ahmedabad. Open till 2 AM. Dine-in, drive-through and no-contact delivery. Nothing over ₹200.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
