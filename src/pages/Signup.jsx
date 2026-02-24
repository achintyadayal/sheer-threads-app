import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      {/* Signup Card */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

        {/* Heading */}
        <h2 className="text-3xl font-semibold text-center mb-2">
          Create Account
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Join Sheer Threads today
        </p>

        {/* Form */}
        <form className="space-y-5">

          {/* Name */}
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="text-sm text-gray-600">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter phone number"
              className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-yellow-400 hover:text-black transition"
          >
            Sign Up
          </button>

        </form>

        {/* Login Link */}
        <div className="text-center mt-6 text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-black font-medium hover:underline"
          >
            Login
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Signup;
