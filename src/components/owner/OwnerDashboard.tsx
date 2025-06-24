import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Home, MessageCircle, BarChart3, Settings, LogOut, Eye, Edit, Trash2, Star, MapPin, Users, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Hostel } from '../../types';

// Mock property data
const mockProperties: Hostel[] = [
  {
    id: '1',
    ownerId: 'owner1',
    name: 'Green Valley Hostel',
    state: 'Lagos',
    city: 'Yaba',
    nearbySchools: ['University of Lagos (UNILAG)', 'Yaba College of Technology (YABATECH)'],
    address: '15 Herbert Macaulay Street, Yaba, Lagos',
    rentType: 'both',
    annualPrice: 180000,
    monthlyPrice: 18000,
    availableRooms: 12,
    genderRestriction: 'mixed',
    amenities: ['WiFi', 'Water Supply', 'Electricity', 'Kitchen', 'Security/Gate', 'Parking'],
    photos: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'],
    rating: 4.5,
    reviews: 28,
    verified: true,
    acceptsMonthlyPayment: true
  }
];

export default function OwnerDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('properties');

  const renderHeader = () => (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">FlexiHostel</h1>
              <p className="text-xs text-gray-500">Property Owner Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/owner/add-property')}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              <span>Add Property</span>
            </button>
            
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user?.fullName}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            
            <button
              onClick={logout}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="flex space-x-8 -mb-px">
          {[
            { id: 'properties', label: 'My Properties', icon: Home },
            { id: 'bookings', label: 'Bookings', icon: Calendar },
            { id: 'messages', label: 'Messages', icon: MessageCircle },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStatsCards = () => (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      {[
        { label: 'Total Properties', value: '3', change: '+1', color: 'blue' },
        { label: 'Active Bookings', value: '12', change: '+3', color: 'emerald' },
        { label: 'Monthly Revenue', value: '₦145,000', change: '+15%', color: 'orange' },
        { label: 'Average Rating', value: '4.6', change: '+0.2', color: 'purple' }
      ].map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
            <div className={`text-${stat.color}-600 text-sm font-medium`}>
              {stat.change}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPropertyCard = (property: Hostel) => (
    <div key={property.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <img
          src={property.photos[0]}
          alt={property.name}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            property.verified 
              ? 'bg-emerald-100 text-emerald-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {property.verified ? 'Verified' : 'Pending'}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex space-x-2">
          <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200">
            <Eye className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200">
            <Edit className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200">
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{property.name}</h3>
            <div className="flex items-center text-gray-600 mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{property.city}, {property.state}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{property.rating}</span>
            </div>
            <span className="text-xs text-gray-500">{property.reviews} reviews</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <div className="text-sm font-medium text-gray-900">{property.availableRooms}</div>
            <div className="text-xs text-gray-600">Available Rooms</div>
          </div>
          <div className="text-center p-3 bg-emerald-50 rounded-lg">
            <Calendar className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
            <div className="text-sm font-medium text-gray-900">85%</div>
            <div className="text-xs text-gray-600">Occupancy Rate</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div>
            <span className="text-gray-600">Annual: </span>
            <span className="font-medium text-gray-900">₦{property.annualPrice.toLocaleString()}</span>
          </div>
          {property.monthlyPrice && (
            <div>
              <span className="text-gray-600">Monthly: </span>
              <span className="font-medium text-emerald-600">₦{property.monthlyPrice.toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'properties':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {renderStatsCards()}
            
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">My Properties</h2>
              <button
                onClick={() => navigate('/owner/add-property')}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Property</span>
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProperties.map(renderPropertyCard)}
            </div>
          </div>
        );
        
      case 'bookings':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Requests</h2>
            <div className="bg-white rounded-xl shadow-md">
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
                <p className="text-gray-600">Student booking requests will appear here</p>
              </div>
            </div>
          </div>
        );
        
      case 'messages':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Messages</h2>
            <div className="bg-white rounded-xl shadow-md">
              <div className="text-center py-12">
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
                <p className="text-gray-600">Messages from students will appear here</p>
              </div>
            </div>
          </div>
        );
        
      case 'analytics':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h2>
            <div className="bg-white rounded-xl shadow-md">
              <div className="text-center py-12">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Coming Soon</h3>
                <p className="text-gray-600">View detailed analytics about your properties</p>
              </div>
            </div>
          </div>
        );
        
      case 'settings':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={user?.fullName || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        disabled
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Verification Status</h3>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Your account is verified and approved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}
      {renderContent()}
    </div>
  );
}