"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { createApiUrl } from "../../lib/api";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setMessage("");

    const formData = new FormData();
    for (let key in data) {
      if (key === 'image') {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }

    try {
      await axios.post(createApiUrl("api/schools"), formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("School added successfully!");
      reset();
    } catch (err) {
      setMessage("Error: " + (err.response?.data?.error || "Something went wrong"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-6 shadow-xl">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          </div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-tight">
            Add New School
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join our educational network by registering your institution. Help parents find the perfect school for their children.
          </p>
          <div className="mt-6 flex items-center justify-center space-x-2">
            <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>
            <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"></div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-white/20 relative">
          {/* Glassmorphism effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 px-8 py-8 relative">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">School Registration Form</h2>
                <p className="text-blue-100 text-sm opacity-90">Complete all required fields marked with *</p>
              </div>
            </div>
            {/* Progress indicator */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm text-blue-100 mb-2">
                <span>Registration Progress</span>
                <span>Step 1 of 1</span>
              </div>
              <div className="w-full bg-blue-800/30 rounded-full h-2">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full w-full transition-all duration-500"></div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-10 relative">
            {/* Basic Information Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Basic Information</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent"></div>
              </div>

              {/* School Name */}
              <div className="group">
                <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                  School Name <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register("name", {
                      required: "School name is required",
                      minLength: { value: 2, message: "Name must be at least 2 characters" }
                    })}
                    placeholder="Enter school name"
                    className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 group-hover:border-blue-300 bg-gray-50/50 focus:bg-white"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <div className={`w-2 h-2 rounded-full transition-colors duration-200 ${errors.name ? 'bg-red-400' : 'bg-green-400 opacity-0 group-focus-within:opacity-100'}`}></div>
                  </div>
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-2 flex items-center animate-shake"><span className="mr-1">⚠</span>{errors.name.message}</p>}
              </div>

              {/* Address */}
              <div className="group">
                <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  Address <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  {...register("address", {
                    required: "Address is required",
                    minLength: { value: 10, message: "Address must be at least 10 characters" }
                  })}
                  placeholder="Enter complete address with landmarks"
                  rows="3"
                  className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 group-hover:border-blue-300 resize-none bg-gray-50/50 focus:bg-white"
                />
                {errors.address && <p className="text-red-500 text-sm mt-2 flex items-center animate-shake"><span className="mr-1">⚠</span>{errors.address.message}</p>}
              </div>
            </div>

            {/* Location Information Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Location Details</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-green-200 to-transparent"></div>
              </div>

              {/* City and State */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="group">
                  <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    City <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    {...register("city", {
                      required: "City is required",
                      minLength: { value: 2, message: "City must be at least 2 characters" }
                    })}
                    placeholder="Enter city"
                    className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-gray-300 group-hover:border-green-300 bg-gray-50/50 focus:bg-white"
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-2 flex items-center animate-shake"><span className="mr-1">⚠</span>{errors.city.message}</p>}
                </div>

                <div className="group">
                  <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945"></path>
                    </svg>
                    State <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    {...register("state", {
                      required: "State is required",
                      minLength: { value: 2, message: "State must be at least 2 characters" }
                    })}
                    placeholder="Enter state"
                    className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-gray-300 group-hover:border-green-300 bg-gray-50/50 focus:bg-white"
                  />
                  {errors.state && <p className="text-red-500 text-sm mt-2 flex items-center animate-shake"><span className="mr-1">⚠</span>{errors.state.message}</p>}
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Contact Information</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-purple-200 to-transparent"></div>
              </div>

              {/* Contact and Email */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="group">
                  <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    Contact Number <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    {...register("contact", {
                      required: "Contact number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Please enter a valid 10-digit number"
                      }
                    })}
                    placeholder="Enter 10-digit number"
                    type="tel"
                    className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-gray-300 group-hover:border-purple-300 bg-gray-50/50 focus:bg-white"
                  />
                  {errors.contact && <p className="text-red-500 text-sm mt-2 flex items-center animate-shake"><span className="mr-1">⚠</span>{errors.contact.message}</p>}
                </div>

                <div className="group">
                  <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    Email Address <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    {...register("email_id", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Please enter a valid email address"
                      }
                    })}
                    placeholder="Enter email address"
                    type="email"
                    className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-gray-300 group-hover:border-purple-300 bg-gray-50/50 focus:bg-white"
                  />
                  {errors.email_id && <p className="text-red-500 text-sm mt-2 flex items-center animate-shake"><span className="mr-1">⚠</span>{errors.email_id.message}</p>}
                </div>
              </div>
            </div>

            {/* Academic Information Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Academic Details</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-orange-200 to-transparent"></div>
              </div>

              {/* Board and Gender Type */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="group">
                  <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    Board <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <select
                      {...register("board", { required: "Board is required" })}
                      className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 hover:border-gray-300 group-hover:border-orange-300 bg-gray-50/50 focus:bg-white appearance-none"
                    >
                      <option value="" className="text-gray-500">Select Board</option>
                      <option value="CBSE" className="text-gray-900">CBSE</option>
                      <option value="ICSE" className="text-gray-900">ICSE</option>
                      <option value="IB" className="text-gray-900">IB</option>
                      <option value="IGCSE" className="text-gray-900">IGCSE</option>
                      <option value="Cambridge" className="text-gray-900">Cambridge</option>
                      <option value="State Board" className="text-gray-900">State Board</option>
                      <option value="Pre-School" className="text-gray-900">Pre-School</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                  {errors.board && <p className="text-red-500 text-sm mt-2 flex items-center animate-shake"><span className="mr-1">⚠</span>{errors.board.message}</p>}
                </div>

                <div className="group">
                  <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    Gender Type <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <select
                      {...register("gender_type", { required: "Gender type is required" })}
                      className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 hover:border-gray-300 group-hover:border-orange-300 bg-gray-50/50 focus:bg-white appearance-none"
                    >
                      <option value="" className="text-gray-500">Select Gender Type</option>
                      <option value="All Boys" className="text-gray-900">All Boys</option>
                      <option value="All Girls" className="text-gray-900">All Girls</option>
                      <option value="Co-Education" className="text-gray-900">Co-Education</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                  {errors.gender_type && <p className="text-red-500 text-sm mt-2 flex items-center animate-shake"><span className="mr-1">⚠</span>{errors.gender_type.message}</p>}
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Additional Information</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-teal-200 to-transparent"></div>
              </div>

              {/* Established Year and Website */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="group">
                  <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    Established Year
                  </label>
                  <input
                    {...register("established_year", {
                      min: { value: 1800, message: "Year must be after 1800" },
                      max: { value: new Date().getFullYear(), message: "Year cannot be in the future" }
                    })}
                    placeholder="e.g., 1995"
                    type="number"
                    className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 hover:border-gray-300 group-hover:border-teal-300 bg-gray-50/50 focus:bg-white"
                  />
                  {errors.established_year && <p className="text-red-500 text-sm mt-2 flex items-center animate-shake"><span className="mr-1">⚠</span>{errors.established_year.message}</p>}
                </div>

                <div className="group">
                  <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"></path>
                    </svg>
                    Website
                  </label>
                  <input
                    {...register("website", {
                      pattern: {
                        value: /^https?:\/\/.+/,
                        message: "Please enter a valid URL starting with http:// or https://"
                      }
                    })}
                    placeholder="e.g., https://www.school.com"
                    type="url"
                    className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 hover:border-gray-300 group-hover:border-teal-300 bg-gray-50/50 focus:bg-white"
                  />
                  {errors.website && <p className="text-red-500 text-sm mt-2 flex items-center animate-shake"><span className="mr-1">⚠</span>{errors.website.message}</p>}
                </div>
              </div>

              {/* Fees Range */}
              <div className="group">
                <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                  Annual Fees Range
                </label>
                <input
                  {...register("fees_range")}
                  placeholder="e.g., ₹50,000 - ₹1,00,000 per year"
                  className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 hover:border-gray-300 group-hover:border-teal-300 bg-gray-50/50 focus:bg-white"
                />
              </div>

              {/* Description */}
              <div className="group">
                <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path>
                  </svg>
                  School Description
                </label>
                <textarea
                  {...register("description")}
                  placeholder="Brief description about the school, facilities, achievements, special programs..."
                  rows="4"
                  className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 hover:border-gray-300 group-hover:border-teal-300 resize-none bg-gray-50/50 focus:bg-white"
                />
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">School Image</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-pink-200 to-transparent"></div>
              </div>

              <div className="group">
                <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  Upload School Image <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 hover:border-pink-400 transition-all duration-200 group-hover:border-pink-300 bg-gradient-to-br from-gray-50 to-pink-50/30 relative overflow-hidden">
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}></div>
                  </div>
                  
                  <div className="text-center relative z-10">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                      <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <input
                      type="file"
                      {...register("image", {
                        required: "School image is required",
                        validate: {
                          fileType: (files) => {
                            if (files[0]) {
                              const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
                              return allowedTypes.includes(files[0].type) || "Only JPEG, PNG, and GIF files are allowed";
                            }
                            return true;
                          },
                          fileSize: (files) => {
                            if (files[0]) {
                              return files[0].size <= 5000000 || "File size must be less than 5MB";
                            }
                            return true;
                          }
                        }
                      })}
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">
                      Drop your image here, or <span className="text-pink-500 underline">browse</span>
                    </h4>
                    <p className="text-sm text-gray-500 mb-4">
                      Supports: JPG, PNG, GIF up to 5MB
                    </p>
                    <div className="inline-flex items-center px-4 py-2 bg-pink-50 border border-pink-200 rounded-lg text-pink-600 text-sm font-medium">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      Choose Image
                    </div>
                  </div>
                </div>
                {errors.image && <p className="text-red-500 text-sm mt-3 flex items-center animate-shake"><span className="mr-1">⚠</span>{errors.image.message}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-8 py-5 rounded-2xl text-lg font-bold hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 focus:ring-4 focus:ring-purple-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-2xl overflow-hidden"
              >
                {/* Button background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                
                {isLoading ? (
                  <span className="flex items-center justify-center relative z-10">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    <span className="tracking-wide">Adding School...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center relative z-10">
                    <svg className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                    <span className="tracking-wide">Register School</span>
                    <svg className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                  </span>
                )}
              </button>
              
              {/* Helper text */}
              <p className="text-center text-sm text-gray-500 mt-4">
                By registering, you agree to our terms and conditions
              </p>
            </div>
          </form>

          {/* Enhanced Message Display */}
          {message && (
            <div className={`mx-8 mb-8 relative overflow-hidden ${message.includes("Error")
                ? "bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200"
                : "bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200"
              } rounded-2xl shadow-lg`}>
              <div className="p-6 flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${message.includes("Error")
                      ? "bg-red-100"
                      : "bg-green-100"
                    }`}>
                    {message.includes("Error") ? (
                      <svg className="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    ) : (
                      <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold text-lg ${message.includes("Error") ? "text-red-800" : "text-green-800"}`}>
                    {message.includes("Error") ? "Registration Failed" : "Success!"}
                  </h4>
                  <p className={`mt-1 ${message.includes("Error") ? "text-red-700" : "text-green-700"}`}>
                    {message}
                  </p>
                  {!message.includes("Error") && (
                    <p className="mt-2 text-sm text-green-600">
                      Your school has been successfully registered and will be reviewed by our team.
                    </p>
                  )}
                </div>
              </div>
              {/* Animated background effect */}
              <div className={`absolute top-0 left-0 h-1 w-full ${message.includes("Error")
                  ? "bg-gradient-to-r from-red-400 to-pink-400"
                  : "bg-gradient-to-r from-green-400 to-emerald-400"
                } animate-pulse`}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
