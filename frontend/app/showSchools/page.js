"use client";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function ShowSchools() {
  const searchParams = useSearchParams();
  const [schools, setSchools] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(9); // 9 schools per page for better grid layout
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState(searchParams.get('search') || "");
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || "");
  const [selectedBoard, setSelectedBoard] = useState(searchParams.get('board') || "");
  const [selectedGenderType, setSelectedGenderType] = useState(searchParams.get('gender_type') || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cities, setCities] = useState([]);

  const boards = ["CBSE", "ICSE", "IB", "IGCSE", "Cambridge", "State Board", "Pre-School"];
  const genderTypes = ["All Boys", "All Girls", "Co-Education"];

  const fetchSchools = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = { page, limit };
      if (search) params.search = search;
      if (selectedCity) params.city = selectedCity;
      if (selectedBoard) params.board = selectedBoard;
      if (selectedGenderType) params.gender_type = selectedGenderType;

      const res = await axios.get("http://localhost:5000/api/schools", { params });
      setSchools(res.data.schools || []);
      setTotal(res.data.total || 0);
      setTotalPages(res.data.totalPages || 0);
    } catch (err) {
      setError("Failed to fetch schools. Please check if the server is running.");
      console.error("Error fetching schools:", err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, selectedCity, selectedBoard, selectedGenderType]);

  const fetchCities = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/cities");
      setCities(response.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    fetchSchools();
  }, [page, search, selectedCity, selectedBoard, selectedGenderType, fetchSchools]);

  const handleSearch = (e) => {
    setPage(1);
    setSearch(e.target.value);
  };

  const handleFilterChange = (type, value) => {
    setPage(1);
    switch (type) {
      case 'city':
        setSelectedCity(value);
        break;
      case 'board':
        setSelectedBoard(value);
        break;
      case 'gender_type':
        setSelectedGenderType(value);
        break;
    }
  };

  const clearFilters = () => {
    setPage(1);
    setSearch("");
    setSelectedCity("");
    setSelectedBoard("");
    setSelectedGenderType("");
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find Schools
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover quality educational institutions that match your preferences
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by school name, city, or address..."
                value={search}
                onChange={handleSearch}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <select
              value={selectedCity}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            <select
              value={selectedBoard}
              onChange={(e) => handleFilterChange('board', e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Boards</option>
              {boards.map((board) => (
                <option key={board} value={board}>{board}</option>
              ))}
            </select>

            <select
              value={selectedGenderType}
              onChange={(e) => handleFilterChange('gender_type', e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Gender Types</option>
              {genderTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <button
              onClick={clearFilters}
              className="bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear Filters
            </button>
          </div>

          {/* Active Filters Display */}
          {(search || selectedCity || selectedBoard || selectedGenderType) && (
            <div className="flex flex-wrap gap-2">
              {search && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Search: {search}
                </span>
              )}
              {selectedCity && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  City: {selectedCity}
                </span>
              )}
              {selectedBoard && (
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  Board: {selectedBoard}
                </span>
              )}
              {selectedGenderType && (
                <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">
                  Type: {selectedGenderType}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading schools...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* No Schools Found */}
        {!loading && !error && schools.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏫</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No schools found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}

        {/* School Cards */}
        {!loading && !error && schools.length > 0 && (
          <>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {schools.map((school) => (
                <div key={school.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {school.image ? (
                    <img
                      src={`http://localhost:5000${school.image}`}
                      alt={school.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = "/api/placeholder/400/200";
                      }}
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  )}
                  
                  <div className="p-6">
                    {/* Board Badge */}
                    <div className="mb-3">
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        {school.board}
                      </span>
                    </div>

                    {/* School Name */}
                    <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {school.name}
                    </h2>

                    {/* Location */}
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      📍 {school.address}
                    </p>
                    <p className="text-sm text-gray-500 font-medium mb-3">
                      🏙️ {school.city}
                    </p>

                    {/* Rating */}
                    {school.rating > 0 && (
                      <div className="flex items-center mb-3">
                        <div className="flex">
                          {renderStars(school.rating)}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {school.rating} ({school.total_reviews} reviews)
                        </span>
                      </div>
                    )}

                    {/* Additional Info */}
                    <div className="space-y-2 text-sm text-gray-600">
                      {school.gender_type && (
                        <p>👥 {school.gender_type}</p>
                      )}
                      {school.established_year && (
                        <p>📅 Est. {school.established_year}</p>
                      )}
                      {school.fees_range && (
                        <p>💰 {school.fees_range}</p>
                      )}
                    </div>

                    {/* Description */}
                    {school.description && (
                      <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                        {school.description}
                      </p>
                    )}

                    {/* Review Button */}
                    <div className="mt-4 pt-4 border-t">
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        Review Now!
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Results Summary */}
            <div className="mt-8 text-center text-sm text-gray-600">
              Showing {schools.length} of {total} schools
              {(search || selectedCity || selectedBoard || selectedGenderType) && " with applied filters"}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border text-sm font-medium ${page === 1
                        ? "bg-gray-50 border-gray-300 text-gray-300 cursor-not-allowed"
                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {/* Page Numbers */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${page === pageNum
                            ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                          }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border text-sm font-medium ${page === totalPages
                        ? "bg-gray-50 border-gray-300 text-gray-300 cursor-not-allowed"
                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                  >
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}