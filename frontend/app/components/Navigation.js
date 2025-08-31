"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-blue-600">
              🎓 SchoolFinder
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/showSchools" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Find Schools
            </Link>
            <Link 
              href="/addSchool" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              School Portal
            </Link>
            <div className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer transition-colors">
              Common Admissions
            </div>
            <div className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer transition-colors">
              Blog
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Log In
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Sign Up
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/showSchools" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Find Schools
              </Link>
              <Link 
                href="/addSchool" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                School Portal
              </Link>
              <div className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer transition-colors">
                Common Admissions
              </div>
              <div className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer transition-colors">
                Blog
              </div>
              <hr className="my-2" />
              <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-left">
                Log In
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-fit">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
