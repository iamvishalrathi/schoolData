"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

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
      await axios.post("http://localhost:5000/api/schools", formData, {
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
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-blue-600 px-6 py-4">
            <h1 className="text-2xl md:text-3xl font-bold text-white">Add New School</h1>
            <p className="text-blue-100 mt-1">Fill in the details below to register a new school</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* School Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                School Name *
              </label>
              <input
                {...register("name", {
                  required: "School name is required",
                  minLength: { value: 2, message: "Name must be at least 2 characters" }
                })}
                placeholder="Enter school name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <textarea
                {...register("address", {
                  required: "Address is required",
                  minLength: { value: 10, message: "Address must be at least 10 characters" }
                })}
                placeholder="Enter complete address"
                rows="3"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
            </div>

            {/* City and State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  {...register("city", {
                    required: "City is required",
                    minLength: { value: 2, message: "City must be at least 2 characters" }
                  })}
                  placeholder="Enter city"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <input
                  {...register("state", {
                    required: "State is required",
                    minLength: { value: 2, message: "State must be at least 2 characters" }
                  })}
                  placeholder="Enter state"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                />
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
              </div>
            </div>

            {/* Contact and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number *
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                />
                {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                />
                {errors.email_id && <p className="text-red-500 text-sm mt-1">{errors.email_id.message}</p>}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                School Image *
              </label>
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
              />
              {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
              <p className="text-sm text-gray-500 mt-1">Accepted formats: JPG, PNG, GIF. Max size: 5MB</p>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
              >
                {isLoading ? "Adding School..." : "Add School"}
              </button>
            </div>
          </form>

          {/* Message */}
          {message && (
            <div className={`mx-6 mb-6 p-4 rounded-lg ${message.includes("Error")
                ? "bg-red-50 text-red-700 border border-red-200"
                : "bg-green-50 text-green-700 border border-green-200"
              }`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
