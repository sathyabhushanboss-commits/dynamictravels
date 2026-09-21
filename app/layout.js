import "./globals.css";

export const metadata = {
  title: "Dynamic Travels | Car Rental & Tours",
  description:
    "Dynamic Travels provides car rentals, Urbania, Innova, Tempo Traveller and bus rentals across South India.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}