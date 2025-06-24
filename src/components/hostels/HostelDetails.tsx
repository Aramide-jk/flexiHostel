import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Users, Wifi, Car, Shield, Twitch as Kitchen, Zap, Droplets, Home, MessageCircle, Heart, Share2, ChevronLeft, ChevronRight, Play, CheckCircle, AlertCircle, CreditCard, Wallet } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Hostel } from '../../types';

// Mock hostel data - in real app, this would come from API
const mockHostel: Hostel = {
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
  amenities: ['WiFi', 'Water Supply', 'Electricity', 'Kitchen', 'Security/Gate', 'Parking', 'Study Room', 'Common Room'],
  photos: [
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg',
    'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg',
    'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg'
  ],
  rating: 4.5,
  reviews: 28,
  verified: true,
  acceptsMonthlyPayment: true
};

const amenityIcons: { [key: string]: React.ComponentType<{ className?: string }> } = {
  'WiFi': Wifi,
  'Water Supply': Droplets,
  'Electricity': Zap,
  'Kitchen': Kitchen,
  'Security/Gate': Shield,
  'Parking': Car,
  'Study Room': Home,
  'Common Room': Users
};

export default function HostelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedPaymentType, setSelectedPaymentType] = useState<'annual' | 'monthly'>('annual');
  const [interestedInMonthly, setInterestedInMonthly] = useState(false);

  // In real app, fetch hostel data based on id
  const hostel = mockHostel;

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % hostel.photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + hostel.photos.length) % hostel.photos.length);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: hostel.name,
        text: `Check out ${hostel.name} - ${hostel.city}, ${hostel.state}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification in real app
    }
  };

  const handleApplication = () => {
    if (interestedInMonthly && hostel.acceptsMonthlyPayment) {
      navigate('/payments/setup');
    } else {
      setShowApplicationModal(true);
    }
  };

  const renderPhotoGallery = () => (
    <div className="relative">
      <div className="aspect-video bg-gray-200 rounded-2xl overflow-hidden">
        <img
          src={hostel.photos[currentPhotoIndex]}
          alt={`${hostel.name} - Photo ${currentPhotoIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation Arrows */}
        {hostel.photos.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </>
        )}
        
        {/* Photo Counter */}
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
          {currentPhotoIndex + 1} / {hostel.photos.length}
        </div>
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={handleSave}
            className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
          </button>
          <button
            onClick={handleShare}
            className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
          >
            <Share2 className="w-5 h-5 text-gray-700" />
          </button>
        </div>
        
        {/* Verification Badge */}
        {hostel.verified && (
          <div className="absolute top-4 left-4 flex items-center space-x-1 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm">
            <Shield className="w-4 h-4" />
            <span>Verified</span>
          </div>
        )}
      </div>
      
      {/* Thumbnail Strip */}
      {hostel.photos.length > 1 && (
        <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
          {hostel.photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => setCurrentPhotoIndex(index)}
              className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === currentPhotoIndex 
                  ? 'border-emerald-500 ring-2 ring-emerald-200' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img
                src={photo}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const renderApplicationModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Apply for This Hostel</h3>
        
        <div className="space-y-4 mb-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-medium text-gray-900 mb-2">{hostel.name}</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {hostel.city}, {hostel.state}
              </div>
              <div className="flex items-center">
                <CreditCard className="w-4 h-4 mr-2" />
                ₦{selectedPaymentType === 'annual' ? hostel.annualPrice.toLocaleString() : hostel.monthlyPrice?.toLocaleString()}/{selectedPaymentType === 'annual' ? 'year' : 'month'}
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedPaymentType('annual')}
                className={`p-3 border-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  selectedPaymentType === 'annual'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                Annual
                <div className="text-xs text-gray-500 mt-1">₦{hostel.annualPrice.toLocaleString()}</div>
              </button>
              {hostel.monthlyPrice && (
                <button
                  onClick={() => setSelectedPaymentType('monthly')}
                  className={`p-3 border-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedPaymentType === 'monthly'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  Monthly
                  <div className="text-xs text-gray-500 mt-1">₦{hostel.monthlyPrice.toLocaleString()}</div>
                </button>
              )}
            </div>
          </div>
          
          {selectedPaymentType === 'monthly' && hostel.acceptsMonthlyPayment && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={interestedInMonthly}
                  onChange={(e) => setInterestedInMonthly(e.target.checked)}
                  className="mt-1 w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <div>
                  <span className="text-sm font-medium text-gray-900">Use FlexiHostel Monthly Payment</span>
                  <p className="text-xs text-gray-600 mt-1">
                    We'll handle the annual payment to the landlord, and you pay us monthly. Small processing fee applies.
                  </p>
                </div>
              </label>
            </div>
          )}
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={() => setShowApplicationModal(false)}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleApplication}
            className="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors duration-200"
          >
            {interestedInMonthly ? 'Setup Monthly Payment' : 'Send Application'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/student/dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Search
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Photo Gallery */}
            {renderPhotoGallery()}

            {/* Basic Info */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{hostel.name}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{hostel.address}</span>
                  </div>
                  <div className="text-sm text-gray-500">{hostel.city}, {hostel.state}</div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-semibold">{hostel.rating}</span>
                  </div>
                  <div className="text-sm text-gray-500">{hostel.reviews} reviews</div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-emerald-50 rounded-xl">
                  <Users className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{hostel.availableRooms}</div>
                  <div className="text-sm text-gray-600">Available Rooms</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <Home className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900 capitalize">{hostel.genderRestriction.replace('-', ' ')}</div>
                  <div className="text-sm text-gray-600">Gender Policy</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <Shield className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{hostel.verified ? 'Verified' : 'Pending'}</div>
                  <div className="text-sm text-gray-600">Status</div>
                </div>
              </div>

              {/* Nearby Schools */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Nearby Institutions</h3>
                <div className="flex flex-wrap gap-2">
                  {hostel.nearbySchools.map((school, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm rounded-full"
                    >
                      {school}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities & Features</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {hostel.amenities.map((amenity, index) => {
                  const IconComponent = amenityIcons[amenity] || Home;
                  return (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About This Property</h3>
              <p className="text-gray-600 leading-relaxed">
                Welcome to {hostel.name}, one of the most sought-after student accommodations in {hostel.city}. 
                Our facility offers modern amenities and a safe environment for students from nearby institutions including {hostel.nearbySchools[0]}. 
                With {hostel.availableRooms} spacious rooms and excellent facilities, we provide the perfect home away from home for your academic journey.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Options</h3>
                
                {/* Annual Pricing */}
                <div className="border-2 border-gray-200 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Annual Rent</span>
                    <span className="text-2xl font-bold text-gray-900">₦{hostel.annualPrice.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-600">Pay once for the entire academic year</p>
                </div>

                {/* Monthly Pricing */}
                {hostel.monthlyPrice && (
                  <div className={`border-2 rounded-xl p-4 mb-4 ${
                    hostel.acceptsMonthlyPayment 
                      ? 'border-emerald-200 bg-emerald-50' 
                      : 'border-gray-200 bg-gray-50'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">Monthly Rent</span>
                      <span className="text-2xl font-bold text-emerald-600">₦{hostel.monthlyPrice.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Pay monthly through FlexiHostel</p>
                    {hostel.acceptsMonthlyPayment ? (
                      <div className="flex items-center text-emerald-600 text-sm">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Available with processing fee
                      </div>
                    ) : (
                      <div className="flex items-center text-gray-500 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        Not available for this property
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setShowApplicationModal(true)}
                  className="w-full bg-emerald-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-emerald-700 transition-colors duration-200"
                >
                  Apply Now
                </button>
                
                <button
                  className="w-full flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Contact Owner</span>
                </button>
              </div>

              {/* Monthly Payment Info */}
              {hostel.acceptsMonthlyPayment && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-start space-x-2">
                    <Wallet className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-900">Monthly Payment Available</h4>
                      <p className="text-xs text-blue-700 mt-1">
                        FlexiHostel can pay the landlord upfront and collect monthly payments from you. 
                        Small processing fee applies.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Owner</h3>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">GO</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Green Properties Ltd.</div>
                  <div className="text-sm text-gray-500">Verified Owner</div>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationModal && renderApplicationModal()}
    </div>
  );
}