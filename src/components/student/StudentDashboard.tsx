import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin, Star, Wifi, Car, Shield, Heart, MessageCircle, User, LogOut, GraduationCap, Wallet } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Hostel } from '../../types';

// Mock hostel data
const mockHostels: Hostel[] = [
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
  },
  {
    id: '2',
    ownerId: 'owner2',
    name: 'Safe Haven Female Hostel',
    state: 'Lagos',
    city: 'Akoka',
    nearbySchools: ['University of Lagos (UNILAG)'],
    address: '23 Akoka Road, Akoka, Lagos',
    rentType: 'annual',
    annualPrice: 220000,
    availableRooms: 8,
    genderRestriction: 'female-only',
    amenities: ['WiFi', 'Water Supply', 'Electricity', 'Furnished', 'Security/Gate', 'Laundry'],
    photos: ['https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg'],
    rating: 4.8,
    reviews: 35,
    verified: true,
    acceptsMonthlyPayment: false
  },
  {
    id: '3',
    ownerId: 'owner3',
    name: 'Tech Hub Residence',
    state: 'Lagos',
    city: 'Yaba',
    nearbySchools: ['Yaba College of Technology (YABATECH)', 'University of Lagos (UNILAG)'],
    address: '8 Technology Drive, Yaba, Lagos',
    rentType: 'both',
    annualPrice: 250000,
    monthlyPrice: 24000,
    availableRooms: 20,
    genderRestriction: 'mixed',
    amenities: ['WiFi', 'Water Supply', 'Electricity', 'Kitchen', 'Study Room', 'Generator', 'Air Conditioning'],
    photos: ['https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg'],
    rating: 4.3,
    reviews: 42,
    verified: true,
    acceptsMonthlyPayment: true
  }
];

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 500000],
    genderRestriction: 'all',
    rentType: 'all',
    amenities: [] as string[]
  });
  const [savedHostels, setSavedHostels] = useState<string[]>([]);

  const handleSaveHostel = (hostelId: string) => {
    setSavedHostels(prev => 
      prev.includes(hostelId) 
        ? prev.filter(id => id !== hostelId)
        : [...prev, hostelId]
    );
  };

  const filteredHostels = mockHostels.filter(hostel => {
    if (searchQuery && !hostel.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !hostel.city.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    if (filters.genderRestriction !== 'all' && hostel.genderRestriction !== filters.genderRestriction) {
      return false;
    }
    
    if (filters.rentType !== 'all' && !hostel.rentType.includes(filters.rentType as any)) {
      return false;
    }
    
    if (hostel.annualPrice < filters.priceRange[0] || hostel.annualPrice > filters.priceRange[1]) {
      return false;
    }
    
    return true;
  });

  const renderHeader = () => (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">FlexiHostel</h1>
              <p className="text-xs text-gray-500">Student Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
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
            { id: 'browse', label: 'Browse Hostels', icon: Search },
            { id: 'saved', label: 'Saved Properties', icon: Heart },
            { id: 'applications', label: 'Applications', icon: MessageCircle },
            { id: 'wallet', label: 'Wallet', icon: Wallet }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-emerald-500 text-emerald-600'
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

  const renderSearchAndFilters = () => (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hostels by name or location..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
        
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender Restriction</label>
                <select
                  value={filters.genderRestriction}
                  onChange={(e) => setFilters(prev => ({ ...prev, genderRestriction: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">All</option>
                  <option value="male-only">Male Only</option>
                  <option value="female-only">Female Only</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rent Type</label>
                <select
                  value={filters.rentType}
                  onChange={(e) => setFilters(prev => ({ ...prev, rentType: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">All</option>
                  <option value="annual">Annual Only</option>
                  <option value="monthly">Monthly Available</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Price (Annual)</label>
                <input
                  type="range"
                  min="0"
                  max="500000"
                  step="10000"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters(prev => ({ ...prev, priceRange: [0, parseInt(e.target.value)] }))}
                  className="w-full"
                />
                <div className="text-sm text-gray-600 mt-1">
                  ₦{filters.priceRange[1].toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderHostelCard = (hostel: Hostel) => (
    <div key={hostel.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={hostel.photos[0]}
          alt={hostel.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          {hostel.verified && (
            <div className="flex items-center space-x-1 bg-emerald-500 text-white px-2 py-1 rounded-full text-xs">
              <Shield className="w-3 h-3" />
              <span>Verified</span>
            </div>
          )}
        </div>
        <button
          onClick={() => handleSaveHostel(hostel.id)}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200"
        >
          <Heart className={`w-4 h-4 ${savedHostels.includes(hostel.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
          <span className="text-xs font-medium text-gray-900">{hostel.availableRooms} rooms</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{hostel.name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{hostel.rating}</span>
            <span className="text-sm text-gray-500">({hostel.reviews})</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{hostel.city}, {hostel.state}</span>
        </div>
        
        <div className="flex items-center space-x-4 mb-3">
          <div className="text-sm">
            <span className="font-medium text-gray-900">₦{hostel.annualPrice.toLocaleString()}</span>
            <span className="text-gray-500">/year</span>
          </div>
          {hostel.monthlyPrice && (
            <div className="text-sm">
              <span className="font-medium text-emerald-600">₦{hostel.monthlyPrice.toLocaleString()}</span>
              <span className="text-gray-500">/month</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2 mb-4">
          {hostel.amenities.slice(0, 3).map((amenity) => (
            <div key={amenity} className="flex items-center space-x-1 text-xs text-gray-600">
              {amenity === 'WiFi' && <Wifi className="w-3 h-3" />}
              {amenity === 'Parking' && <Car className="w-3 h-3" />}
              {amenity === 'Security/Gate' && <Shield className="w-3 h-3" />}
              <span>{amenity}</span>
            </div>
          ))}
          {hostel.amenities.length > 3 && (
            <span className="text-xs text-gray-500">+{hostel.amenities.length - 3} more</span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate(`/hostel/${hostel.id}`)}
            className="flex-1 bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 transition-colors duration-200 text-sm font-medium"
          >
            View Details
          </button>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <MessageCircle className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'browse':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {renderSearchAndFilters()}
            <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHostels.map(renderHostelCard)}
            </div>
            {filteredHostels.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hostels found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        );
        
      case 'saved':
        const savedHostelsList = mockHostels.filter(h => savedHostels.includes(h.id));
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Saved Properties</h2>
            {savedHostelsList.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedHostelsList.map(renderHostelCard)}
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No saved properties</h3>
                <p className="text-gray-600">Save hostels you're interested in to view them here</p>
              </div>
            )}
          </div>
        );
        
      case 'applications':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Applications</h2>
            <div className="text-center py-12">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
              <p className="text-gray-600">Your hostel applications will appear here</p>
            </div>
          </div>
        );
        
      case 'wallet':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Wallet & Payments</h2>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-center py-8">
                <Wallet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Wallet Coming Soon</h3>
                <p className="text-gray-600">Manage your payments and monthly rent subscriptions</p>
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