"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx" // already installed via Tailwind

const links = [
  { label: "Schools", href: "/schools" },
  { label: "Add School", href: "/add-school" },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              SchoolDir
            </Link>
          </div>

          {/* Nav links */}
          <div className="flex items-center space-x-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(
                  "px-3 py-2 rounded-md text-sm font-medium transition",
                  pathname === l.href
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:text-blue-600"
                )}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
