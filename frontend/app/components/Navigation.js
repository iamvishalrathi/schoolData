"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              School Management
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
              >
                Home
              </Link>
              <Link
                href="/addSchool"
                className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
              >
                Add School
              </Link>
              <Link
                href="/showSchools"
                className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
              >
                View Schools
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              className="mobile-menu-button p-2 rounded-md hover:bg-blue-700 transition duration-200"
              onClick={toggleMobileMenu}
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`md:hidden bg-blue-700 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            className="hover:bg-blue-800 block px-3 py-2 rounded-md text-base font-medium transition duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/addSchool"
            className="hover:bg-blue-800 block px-3 py-2 rounded-md text-base font-medium transition duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Add School
          </Link>
          <Link
            href="/showSchools"
            className="hover:bg-blue-800 block px-3 py-2 rounded-md text-base font-medium transition duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            View Schools
          </Link>
        </div>
      </div>
    </nav>
  );
}
