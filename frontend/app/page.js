"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              School Management System
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Efficiently manage and showcase educational institutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/addSchool"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:bg-gray-100 transition duration-300"
              >
                ➕ Add New School
              </Link>
              <Link
                href="/showSchools"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
              >
                🏫 Browse Schools
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to manage school information effectively
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">Easy Registration</h3>
              <p className="text-gray-600">
                Simple form to add new schools with validation and image upload
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">Search & Filter</h3>
              <p className="text-gray-600">
                Quickly find schools by name, city, or other criteria
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">Responsive Design</h3>
              <p className="text-gray-600">
                Works perfectly on desktop, tablet, and mobile devices
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
