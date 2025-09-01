"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { createApiUrl } from "../../../lib/api";

export default function SchoolDetail() {
  const params = useParams();
  const router = useRouter();
  const [school, setSchool] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newReview, setNewReview] = useState({
    rating: 5,
    review: "",
    reviewer_name: "",
    reviewer_email: ""
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [reviewMessage, setReviewMessage] = useState("");

  const fetchSchoolDetail = useCallback(async () => {
    try {
      const response = await axios.get(createApiUrl(`api/schools/${params.id}`));
      setSchool(response.data);
    } catch (err) {
      setError("School not found");
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  const fetchReviews = useCallback(async () => {
    try {
      const response = await axios.get(createApiUrl(`api/schools/${params.id}/reviews`));
      setReviews(response.data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id) {
      fetchSchoolDetail();
      fetchReviews();
    }
  }, [params.id, fetchSchoolDetail, fetchReviews]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setReviewMessage("");

    try {
      await axios.post(createApiUrl(`api/schools/${params.id}/review`), newReview);
      setReviewMessage("Review submitted successfully!");
      setNewReview({ rating: 5, review: "", reviewer_name: "", reviewer_email: "" });
      fetchReviews(); // Refresh reviews
      fetchSchoolDetail(); // Update rating
    } catch (err) {
      setReviewMessage("Error submitting review: " + (err.response?.data?.error || "Something went wrong"));
    } finally {
      setSubmitLoading(false);
    }
  };

  const renderStars = (rating, size = "text-sm") => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className={`text-yellow-400 ${size}`}>★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className={`text-yellow-400 ${size}`}>☆</span>);
    }
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
      stars.push(<span key={i} className={`text-gray-300 ${size}`}>☆</span>);
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading school details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏫</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{error}</h1>
          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-700 font-medium"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to Schools
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* School Header */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative h-64 bg-gradient-to-r from-blue-600 to-purple-600">
                {school.image && (
                  <Image
                    src={createApiUrl(school.image)}
                    alt={school.name}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h1 className="text-3xl font-bold mb-2">{school.name}</h1>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      {renderStars(school.rating, "text-lg")}
                      <span className="ml-2 text-sm">({school.total_reviews} reviews)</span>
                    </div>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{school.board}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* School Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">School Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">📍 Address</h3>
                  <p className="text-gray-600">{school.address}</p>
                  <p className="text-gray-600">{school.city}, {school.state}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">📞 Contact</h3>
                  <p className="text-gray-600">{school.contact}</p>
                  <p className="text-gray-600">{school.email_id}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🎓 Board</h3>
                  <p className="text-gray-600">{school.board}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">👥 Type</h3>
                  <p className="text-gray-600">{school.gender_type}</p>
                </div>

                {school.established_year && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">📅 Established</h3>
                    <p className="text-gray-600">{school.established_year}</p>
                  </div>
                )}

                {school.fees_range && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">💰 Fee Range</h3>
                    <p className="text-gray-600">{school.fees_range}</p>
                  </div>
                )}
              </div>

              {school.website && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">🌐 Website</h3>
                  <a
                    href={school.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    {school.website}
                  </a>
                </div>
              )}

              {school.description && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">📝 About</h3>
                  <p className="text-gray-600 leading-relaxed">{school.description}</p>
                </div>
              )}
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews & Ratings</h2>
              
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold">
                              {review.reviewer_name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{review.reviewer_name}</p>
                            <div className="flex items-center">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      {review.review && (
                        <p className="text-gray-600 ml-13">{review.review}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Contact School
                </button>
                <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
                  Request Admission Info
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                  Save to Favorites
                </button>
              </div>
            </div>

            {/* Add Review */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Write a Review</h3>
              
              {reviewMessage && (
                <div className={`mb-4 p-3 rounded-lg text-sm ${reviewMessage.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                  {reviewMessage}
                </div>
              )}

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  >
                    <option value={5}>5 Stars - Excellent</option>
                    <option value={4}>4 Stars - Good</option>
                    <option value={3}>3 Stars - Average</option>
                    <option value={2}>2 Stars - Poor</option>
                    <option value={1}>1 Star - Terrible</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={newReview.reviewer_name}
                    onChange={(e) => setNewReview({...newReview, reviewer_name: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email (optional)</label>
                  <input
                    type="email"
                    value={newReview.reviewer_email}
                    onChange={(e) => setNewReview({...newReview, reviewer_email: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                  <textarea
                    value={newReview.review}
                    onChange={(e) => setNewReview({...newReview, review: e.target.value})}
                    rows="4"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="Share your experience..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitLoading}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitLoading ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
