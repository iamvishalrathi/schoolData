"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(6); // 6 schools per page
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSchools = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5000/api/schools", {
        params: { page, limit, search },
      });
      setSchools(res.data.schools || []);
      setTotal(res.data.total || 0);
      setTotalPages(res.data.totalPages || 0);
    } catch (err) {
      setError("Failed to fetch schools. Please check if the server is running.");
      console.error("Error fetching schools:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, [page, search]);

  const handleSearch = (e) => {
    setPage(1); // reset to first page on new search
    setSearch(e.target.value);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Schools
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover quality educational institutions in your area
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name, city, or address..."
              value={search}
              onChange={handleSearch}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
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
              {search ? "Try adjusting your search terms" : "No schools have been added yet"}
            </p>
          </div>
        )}

        {/* School Cards */}
        {!loading && !error && schools.length > 0 && (
          <>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
                    <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {school.name}
                    </h2>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      📍 {school.address}
                    </p>
                    <p className="text-sm text-gray-500 font-medium">
                      🏙️ {school.city}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Results Summary */}
            <div className="mt-8 text-center text-sm text-gray-600">
              Showing {schools.length} of {total} schools
              {search && ` for "${search}"`}
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
