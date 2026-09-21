import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-[#087f9f]"
        >
          Dynamic Travels
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">

          <Link
            href="/"
            className="font-medium text-gray-700 transition hover:text-[#087f9f]"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="font-medium text-gray-700 transition hover:text-[#087f9f]"
          >
            About
          </Link>

          <Link
            href="/fleet"
            className="font-medium text-gray-700 transition hover:text-[#087f9f]"
          >
            Fleet
          </Link>

          <Link
            href="/destinations"
            className="font-medium text-gray-700 transition hover:text-[#087f9f]"
          >
            Destinations
          </Link>

          <Link
            href="/contact"
            className="rounded-full bg-[#087f9f] px-5 py-2.5 font-semibold text-white transition hover:bg-[#066b85]"
          >
            Contact
          </Link>

        </nav>

        {/* Mobile Contact Button */}
        <Link
          href="/contact"
          className="rounded-full bg-[#087f9f] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#066b85] md:hidden"
        >
          Contact
        </Link>

      </div>
    </header>
  );
}