"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Important Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Important Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/showSchools" className="text-gray-300 hover:text-white transition-colors">
                  Schools in India
                </Link>
              </li>
              <li>
                <Link href="/showSchools" className="text-gray-300 hover:text-white transition-colors">
                  Other Schools in India
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Colleges in India
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Advertise With Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Common Admissions
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tools</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  CGPA Converter
                </a>
              </li>
              <li>
                <Link href="/addSchool" className="text-gray-300 hover:text-white transition-colors">
                  Add Your School
                </Link>
              </li>
              <li>
                <Link href="/showSchools" className="text-gray-300 hover:text-white transition-colors">
                  School Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-300">
              <p>📧 support@schoolfinder.com</p>
              <p>📞 +91 98765 43210</p>
              <div className="mt-4">
                <h4 className="font-medium mb-2">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Facebook
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Twitter
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300">
            <span className="font-semibold">🎓 SchoolFinder</span> - Find the right school for your child
          </p>
          <p className="text-gray-400 mt-2">
            Copyright © 2025 SchoolFinder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
