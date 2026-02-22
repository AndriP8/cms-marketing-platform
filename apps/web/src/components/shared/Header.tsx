import Link from "next/link";
import type { SITE_CONFIG_QUERYResult } from "@/sanity/types";

type SiteConfig = NonNullable<SITE_CONFIG_QUERYResult>;

export function Header({ siteConfig }: { siteConfig: SiteConfig }) {
  const { siteName, nav } = siteConfig;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-500 to-cyan-500">
                {siteName || "Forge"}
              </span>
            </Link>
          </div>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center space-x-8">
            {nav?.map((item) => {
              if (item._type !== "navItem" || !item.href || !item.label)
                return null;

              return (
                <Link
                  key={item._key}
                  href={item.href}
                  className="text-sm font-medium text-zinc-600 hover:text-indigo-600 dark:text-zinc-300 dark:hover:text-indigo-400 transition-colors"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button - simple placeholder for now */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              aria-label="Toggle menu"
              className="text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <title>Toggle Menu</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <title>Toggle Menu</title>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
