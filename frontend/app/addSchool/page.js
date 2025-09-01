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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Add New School</h1>
          <p className="text-lg text-gray-600">Register your educational institution with us</p>
        </div>

        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white mb-2">School Information</h2>
            <p className="text-blue-100">Fill in the details below to register your school</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
            {/* School Name */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                School Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register("name", {
                  required: "School name is required",
                  minLength: { value: 2, message: "Name must be at least 2 characters" }
                })}
                placeholder="Enter school name"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 hover:border-gray-300"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1 flex items-center"><span className="mr-1">⚠</span>{errors.name.message}</p>}
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("address", {
                  required: "Address is required",
                  minLength: { value: 10, message: "Address must be at least 10 characters" }
                })}
                placeholder="Enter complete address"
                rows="3"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 hover:border-gray-300 resize-none"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1 flex items-center"><span className="mr-1">⚠</span>{errors.address.message}</p>}
            </div>

            {/* City and State */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("city", {
                    required: "City is required",
                    minLength: { value: 2, message: "City must be at least 2 characters" }
                  })}
                  placeholder="Enter city"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 hover:border-gray-300"
                />
                {errors.city && <p className="text-red-500 text-sm mt-1 flex items-center"><span className="mr-1">⚠</span>{errors.city.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("state", {
                    required: "State is required",
                    minLength: { value: 2, message: "State must be at least 2 characters" }
                  })}
                  placeholder="Enter state"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 hover:border-gray-300"
                />
                {errors.state && <p className="text-red-500 text-sm mt-1 flex items-center"><span className="mr-1">⚠</span>{errors.state.message}</p>}
              </div>
            </div>

            {/* Contact and Email */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Contact Number <span className="text-red-500">*</span>
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
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 hover:border-gray-300"
                />
                {errors.contact && <p className="text-red-500 text-sm mt-1 flex items-center"><span className="mr-1">⚠</span>{errors.contact.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Email Address <span className="text-red-500">*</span>
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
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 hover:border-gray-300"
                />
                {errors.email_id && <p className="text-red-500 text-sm mt-1 flex items-center"><span className="mr-1">⚠</span>{errors.email_id.message}</p>}
              </div>
            </div>

            {/* Board and Gender Type */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Board <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("board", { required: "Board is required" })}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 hover:border-gray-300 bg-white"
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
                {errors.board && <p className="text-red-500 text-sm mt-1 flex items-center"><span className="mr-1">⚠</span>{errors.board.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Gender Type <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("gender_type", { required: "Gender type is required" })}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 hover:border-gray-300 bg-white"
                >
                  <option value="" className="text-gray-500">Select Gender Type</option>
                  <option value="All Boys" className="text-gray-900">All Boys</option>
                  <option value="All Girls" className="text-gray-900">All Girls</option>
                  <option value="Co-Education" className="text-gray-900">Co-Education</option>
                </select>
                {errors.gender_type && <p className="text-red-500 text-sm mt-1 flex items-center"><span className="mr-1">⚠</span>{errors.gender_type.message}</p>}
              </div>
            </div>

            {/* Established Year and Website */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Established Year
                </label>
                <input
                  {...register("established_year", {
                    min: { value: 1800, message: "Year must be after 1800" },
                    max: { value: new Date().getFullYear(), message: "Year cannot be in the future" }
                  })}
                  placeholder="e.g., 1995"
                  type="number"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 hover:border-gray-300"
                />
                {errors.established_year && <p className="text-red-500 text-sm mt-1 flex items-center"><span className="mr-1">⚠</span>{errors.established_year.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
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
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 hover:border-gray-300"
                />
                {errors.website && <p className="text-red-500 text-sm mt-1 flex items-center"><span className="mr-1">⚠</span>{errors.website.message}</p>}
              </div>
            </div>

            {/* Fees Range */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Fees Range
              </label>
              <input
                {...register("fees_range")}
                placeholder="e.g., ₹50,000 - ₹1,00,000 per year"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 hover:border-gray-300"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Description
              </label>
              <textarea
                {...register("description")}
                placeholder="Brief description about the school, facilities, achievements..."
                rows="4"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 hover:border-gray-300 resize-none"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                School Image <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-400 transition duration-200">
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
                  className="w-full text-gray-900 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600 file:font-semibold hover:file:bg-blue-100 file:cursor-pointer cursor-pointer"
                />
                <p className="text-sm text-gray-500 mt-3 text-center">
                  <span className="font-medium">Click to upload</span> or drag and drop<br/>
                  JPG, PNG, GIF (max. 5MB)
                </p>
              </div>
              {errors.image && <p className="text-red-500 text-sm mt-1 flex items-center"><span className="mr-1">⚠</span>{errors.image.message}</p>}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding School...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                    Add School
                  </span>
                )}
              </button>
            </div>
          </form>

          {/* Message */}
          {message && (
            <div className={`mx-8 mb-8 p-4 rounded-xl border-l-4 ${message.includes("Error")
                ? "bg-red-50 text-red-800 border-red-400"
                : "bg-green-50 text-green-800 border-green-400"
              } flex items-start space-x-3`}>
              <div className="flex-shrink-0">
                {message.includes("Error") ? (
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="font-medium">{message}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
