import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Home, User, Shield } from 'lucide-react';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  FlexiHostel
                </h1>
                <p className="text-sm text-gray-500">Verified Student Housing</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors duration-200"
            >
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">Login</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Find or List Verified
            <span className="block bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Student Hostels in Nigeria
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connect with affordable, safe, and verified student accommodation. 
            Whether you're looking for a place to stay or have properties to rent out, 
            we've got you covered.
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* Student Card */}
          <div 
            onClick={() => navigate('/signup/student')}
            className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-emerald-200 transform hover:-translate-y-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">I'm a Student</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Find affordable, verified hostels near your institution with flexible payment options.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                  Search by location & institution
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                  Monthly or yearly rent options
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                  Verified & safe accommodations
                </li>
              </ul>
              <div className="flex items-center justify-between">
                <span className="text-emerald-600 font-semibold group-hover:text-emerald-700">Get Started →</span>
                <Shield className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
          </div>

          {/* Property Owner Card */}
          <div 
            onClick={() => navigate('/signup/owner')}
            className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-200 transform hover:-translate-y-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-orange-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Home className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">I'm a Property Owner</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                List your properties and reach thousands of students looking for accommodation.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Easy property listing process
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Reach verified students
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Secure payment processing
                </li>
              </ul>
              <div className="flex items-center justify-between">
                <span className="text-blue-600 font-semibold group-hover:text-blue-700">Get Started →</span>
                <Shield className="w-5 h-5 text-blue-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-6 bg-white rounded-2xl px-8 py-4 shadow-lg">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-medium text-gray-700">Verified Properties</span>
            </div>
            <div className="w-1 h-6 bg-gray-200"></div>
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">Student Focused</span>
            </div>
            <div className="w-1 h-6 bg-gray-200"></div>
            <div className="flex items-center space-x-2">
              <Home className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-medium text-gray-700">Trusted Platform</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}