"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

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
        const response = await axios.get("http://localhost:5000/api/cities");
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
      const response = await axios.post("http://localhost:5000/api/newsletter", { email });
      setSubscriptionMessage(response.data.message);
      setEmail("");
      setTimeout(() => setSubscriptionMessage(""), 3000);
    } catch (error) {
      setSubscriptionMessage("Failed to subscribe. Please try again.");
      setTimeout(() => setSubscriptionMessage(""), 3000);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Search */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              School Search
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Find the right school for your child.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-4 shadow-lg">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="School Name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:w-64">
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={handleSearch}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    🔍 Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Cities */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Popular Cities
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {popularCities.map((city) => (
              <button
                key={city}
                onClick={() => handleCityClick(city)}
                className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors text-sm font-medium"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Boards Filter */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Search by Board
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["ICSE", "CBSE", "IB", "Cambridge", "State Board", "Pre-School"].map((board) => (
              <button
                key={board}
                onClick={() => router.push(`/showSchools?board=${encodeURIComponent(board)}`)}
                className="bg-blue-100 text-blue-800 px-6 py-3 rounded-lg hover:bg-blue-200 transition-colors font-medium"
              >
                {board}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gender Type Filter */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {["All Boys", "All Girls", "Co-Education"].map((type) => (
              <button
                key={type}
                onClick={() => router.push(`/showSchools?gender_type=${encodeURIComponent(type)}`)}
                className="bg-purple-100 text-purple-800 px-6 py-3 rounded-lg hover:bg-purple-200 transition-colors font-medium"
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Schools Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Schools
            </h2>
            <p className="text-lg text-gray-600">
              Discover top-rated educational institutions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🏫</div>
              <h3 className="text-xl font-semibold mb-2">Quality Education</h3>
              <p className="text-gray-600">
                Find schools with excellent academic standards and modern facilities
              </p>
            </div>
            <div className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold mb-2">Top Ratings</h3>
              <p className="text-gray-600">
                Schools rated highly by parents and education experts
              </p>
            </div>
            <div className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-semibold mb-2">Convenient Locations</h3>
              <p className="text-gray-600">
                Find schools in your preferred city and neighborhood
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to our Newsletter</h2>
          <p className="text-lg mb-8 opacity-90">
            Get updated about admission forms, deadlines and articles to help you through the process.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter email here..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 p-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Subscribe
            </button>
          </form>
          {subscriptionMessage && (
            <p className="mt-4 text-center">{subscriptionMessage}</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Quick Actions
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/addSchool"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-700 transition duration-300 text-center"
            >
              ➕ Add Your School
            </Link>
            <Link
              href="/showSchools"
              className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:text-white transition duration-300 text-center"
            >
              🏫 Browse All Schools
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
