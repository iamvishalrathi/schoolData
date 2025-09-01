"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL, createApiUrl } from "../lib/api";

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);
  const [email, setEmail] = useState("");
  const [subscriptionMessage, setSubscriptionMessage] = useState("");

  // Fetch cities for dropdown
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(createApiUrl("api/cities"));
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, []);

  const popularCities = [
    "Lucknow", "Noida", "New Delhi", "Gurgaon", "Faridabad", "Hyderabad",
    "Greater Noida", "Pune", "Ghaziabad", "Dehradun", "Kolkata", "Chennai",
    "Mumbai", "Bengaluru"
  ];

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (searchTerm) searchParams.append('search', searchTerm);
    if (selectedCity) searchParams.append('city', selectedCity);
    
    router.push(`/showSchools?${searchParams.toString()}`);
  };

  const handleCityClick = (city) => {
    router.push(`/showSchools?city=${encodeURIComponent(city)}`);
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(createApiUrl("api/newsletter"), { email });
      setSubscriptionMessage(response.data.message);
      setEmail("");
      setTimeout(() => setSubscriptionMessage(""), 3000);
    } catch (error) {
      setSubscriptionMessage("Failed to subscribe. Please try again.");
      setTimeout(() => setSubscriptionMessage(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Enhanced hero content */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                Find Your Perfect
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  School Match
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
                Discover the ideal educational environment for your child&apos;s future. 
                Search through thousands of schools with our advanced filtering system.
              </p>
              
              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 mb-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">1000+</div>
                  <div className="text-white/80">Schools Listed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">50+</div>
                  <div className="text-white/80">Cities Covered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">10K+</div>
                  <div className="text-white/80">Happy Parents</div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Search Bar */}
            <div className="max-w-5xl mx-auto">
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search for schools by name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                    />
                  </div>
                  <div className="lg:w-80 relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg appearance-none bg-white"
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                  <button
                    onClick={handleSearch}
                    className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
                  >
                    <svg className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    Search Schools
                  </button>
                </div>
                
                {/* Quick search tips */}
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <span className="text-sm text-gray-600">Popular searches:</span>
                  {["CBSE Schools", "International Schools", "Boarding Schools"].map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchTerm(term)}
                      className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors duration-200"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Popular Cities */}
      <div className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Schools by City
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse schools in popular cities across India
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {popularCities.map((city, index) => (
              <button
                key={city}
                onClick={() => handleCityClick(city)}
                className="group relative bg-white border-2 border-gray-200 hover:border-blue-300 rounded-xl p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                  </div>
                  <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 text-sm">
                    {city}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Boards Section */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Search by Education Board
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find schools based on your preferred curriculum and education board
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "CBSE", description: "Central Board of Secondary Education", icon: "📚", color: "from-blue-500 to-blue-600" },
              { name: "ICSE", description: "Indian Certificate of Secondary Education", icon: "🎓", color: "from-green-500 to-green-600" },
              { name: "IB", description: "International Baccalaureate", icon: "🌍", color: "from-purple-500 to-purple-600" },
              { name: "Cambridge", description: "Cambridge Assessment International", icon: "🏛️", color: "from-indigo-500 to-indigo-600" },
              { name: "State Board", description: "State Government Curriculum", icon: "🏫", color: "from-orange-500 to-orange-600" },
              { name: "Pre-School", description: "Early Childhood Education", icon: "🧸", color: "from-pink-500 to-pink-600" }
            ].map((board, index) => (
              <button
                key={board.name}
                onClick={() => router.push(`/showSchools?board=${encodeURIComponent(board.name)}`)}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-gray-200"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${board.color} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
                    {board.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {board.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {board.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Gender Type Filter */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Find Schools by Type
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from different types of educational institutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: "All Boys", description: "Focused environment for boys", icon: "👦", color: "from-blue-500 to-cyan-500" },
              { name: "All Girls", description: "Empowering education for girls", icon: "👧", color: "from-pink-500 to-rose-500" },
              { name: "Co-Education", description: "Mixed learning environment", icon: "👫", color: "from-green-500 to-emerald-500" }
            ].map((type, index) => (
              <button
                key={type.name}
                onClick={() => router.push(`/showSchools?gender_type=${encodeURIComponent(type.name)}`)}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-gray-200"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="text-center">
                  <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${type.color} rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
                    {type.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                    {type.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {type.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <div className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose SchoolData?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We make finding the perfect school easier with our comprehensive platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🏫",
                title: "Comprehensive Database",
                description: "Access detailed information about thousands of schools across India with verified data and real reviews.",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: "⭐",
                title: "Verified Reviews",
                description: "Read authentic reviews from parents and students to make informed decisions about your child&apos;s education.",
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: "🎯",
                title: "Smart Filtering",
                description: "Find schools that match your exact requirements with our advanced search and filtering system.",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: "📍",
                title: "Location-Based Search",
                description: "Discover schools near you or in your preferred city with detailed location information and maps.",
                color: "from-purple-500 to-indigo-500"
              },
              {
                icon: "💰",
                title: "Fee Transparency",
                description: "Compare fee structures and financial information to find schools that fit your budget.",
                color: "from-pink-500 to-rose-500"
              },
              {
                icon: "📱",
                title: "Easy Registration",
                description: "Simple and quick school registration process for institutions to list their programs and facilities.",
                color: "from-cyan-500 to-teal-500"
              }
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-200">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Newsletter Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
              Get the latest updates about admission forms, deadlines, and helpful articles for your child&apos;s educational journey.
            </p>
          </div>
          
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-4 pl-12 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white border-2 border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
              </div>
              <button
                type="submit"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-200 font-bold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
                Subscribe
              </button>
            </div>
          </form>
          
          {subscriptionMessage && (
            <div className="mt-6 p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
              <p className="text-white font-medium">{subscriptionMessage}</p>
            </div>
          )}
          
          <div className="mt-8 text-sm opacity-80">
            <p>Join 10,000+ parents who get our weekly updates</p>
          </div>
        </div>
      </div>

      {/* Enhanced Call-to-Action Section */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you&apos;re a parent looking for schools or an institution wanting to register, we&apos;re here to help.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link
              href="/addSchool"
              className="group bg-gradient-to-br from-blue-600 to-purple-600 text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">List Your School</h3>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Register your educational institution and reach thousands of potential students and parents.
              </p>
              <span className="inline-flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform duration-200">
                Get Started
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </span>
            </Link>
            
            <Link
              href="/showSchools"
              className="group bg-white border-2 border-gray-200 hover:border-blue-300 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">Find Schools</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Explore our comprehensive database of schools and find the perfect match for your child.
              </p>
              <span className="inline-flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-200">
                Browse Schools
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
