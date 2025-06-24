import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Upload, CheckCircle, Home, Building, Clock } from 'lucide-react';
import { nigerianStates } from '../../data/nigeria';
import { useAuth } from '../../contexts/AuthContext';

interface OwnerFormData {
  // Step 1: Basic Info & Role
  roleType: 'owner' | 'agent';
  fullName: string;
  businessName: string;
  email: string;
  password: string;
  confirmPassword: string;
  
  // Step 2: Location Info
  state: string;
  city: string;
  nearbySchools: string[];
  propertyAddress: string;
  
  // Step 3: KYC Documents
  governmentId: File | null;
  businessDocument: File | null;
}

export default function OwnerSignup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OwnerFormData>({
    roleType: 'owner',
    fullName: '',
    businessName: '',
    email: '',
    password: '',
    confirmPassword: '',
    state: '',
    city: '',
    nearbySchools: [],
    propertyAddress: '',
    governmentId: null,
    businessDocument: null
  });

  const selectedState = nigerianStates.find(state => state.name === formData.state);

  const handleInputChange = (field: keyof OwnerFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSchoolToggle = (school: string) => {
    setFormData(prev => ({
      ...prev,
      nearbySchools: prev.nearbySchools.includes(school)
        ? prev.nearbySchools.filter(s => s !== school)
        : [...prev.nearbySchools, school]
    }));
  };

  const handleFileUpload = (field: 'governmentId' | 'businessDocument', file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };

  const handleSubmit = () => {
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      email: formData.email,
      fullName: formData.fullName,
      role: formData.roleType,
      verified: false,
      profileComplete: true,
      businessName: formData.businessName,
      state: formData.state,
      city: formData.city,
      nearbySchools: formData.nearbySchools,
      propertyAddress: formData.propertyAddress,
      approvalStatus: 'pending' as const
    };

    login(user);
    navigate('/owner/dashboard');
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <React.Fragment key={step}>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
            step === currentStep 
              ? 'bg-blue-500 border-blue-500 text-white' 
              : step < currentStep 
                ? 'bg-blue-100 border-blue-500 text-blue-600'
                : 'bg-gray-100 border-gray-300 text-gray-400'
          }`}>
            {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
          </div>
          {step < 4 && (
            <div className={`w-12 h-0.5 mx-2 transition-all duration-300 ${
              step < currentStep ? 'bg-blue-500' : 'bg-gray-200'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Information & Role</h2>
        <p className="text-gray-600">Tell us about yourself and your role</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">I am a *</label>
        <div className="grid grid-cols-2 gap-4">
          {[
            { value: 'owner', label: 'House Owner', icon: Home, desc: 'I own properties to rent out' },
            { value: 'agent', label: 'Property Agent', icon: Building, desc: 'I manage properties for owners' }
          ].map((option) => (
            <label
              key={option.value}
              className={`flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                formData.roleType === option.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="roleType"
                value={option.value}
                checked={formData.roleType === option.value}
                onChange={(e) => handleInputChange('roleType', e.target.value as any)}
                className="sr-only"
              />
              <option.icon className="w-8 h-8 mb-2" />
              <span className="font-medium">{option.label}</span>
              <span className="text-xs text-center mt-1">{option.desc}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Name {formData.roleType === 'agent' ? '*' : '(Optional)'}
          </label>
          <input
            type="text"
            value={formData.businessName}
            onChange={(e) => handleInputChange('businessName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Your business/company name"
            required={formData.roleType === 'agent'}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          placeholder="your@email.com"
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Create a strong password"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Confirm your password"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Location Information</h2>
        <p className="text-gray-600">Where are your properties located?</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
          <select
            value={formData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            required
          >
            <option value="">Select state</option>
            {nigerianStates.map((state) => (
              <option key={state.name} value={state.name}>{state.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City/Town *</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Enter city or town"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Nearby Schools/Institutions Your Properties Serve *
        </label>
        <div className="grid md:grid-cols-2 gap-3 max-h-48 overflow-y-auto border border-gray-200 rounded-xl p-4">
          {selectedState?.institutions.map((school) => (
            <label
              key={school}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                formData.nearbySchools.includes(school)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.nearbySchools.includes(school)}
                onChange={() => handleSchoolToggle(school)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-3"
              />
              <span className="text-sm">{school}</span>
            </label>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">Select all institutions your properties can serve</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Property Address *</label>
        <textarea
          value={formData.propertyAddress}
          onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          placeholder="Enter the general area or specific address of your properties"
          required
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">KYC Verification</h2>
        <p className="text-gray-600">Upload documents for verification</p>
      </div>

      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-300 transition-colors duration-200">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
          <h3 className="text-sm font-medium text-gray-900 mb-2">Government ID *</h3>
          <p className="text-xs text-gray-500 mb-4">
            Upload NIN, Driver's License, International Passport, or Voter's Card
          </p>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => handleFileUpload('governmentId', e.target.files?.[0] || null)}
            className="hidden"
            id="governmentId"
          />
          <label
            htmlFor="governmentId"
            className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-200 transition-colors duration-200 cursor-pointer"
          >
            Choose File
          </label>
          {formData.governmentId && (
            <p className="text-xs text-blue-600 mt-2">✓ {formData.governmentId.name}</p>
          )}
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-300 transition-colors duration-200">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            Business Document {formData.roleType === 'agent' ? '*' : '(Optional)'}
          </h3>
          <p className="text-xs text-gray-500 mb-4">
            Upload CAC certificate, Utility Bill, or other business verification documents
          </p>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => handleFileUpload('businessDocument', e.target.files?.[0] || null)}
            className="hidden"
            id="businessDocument"
          />
          <label
            htmlFor="businessDocument"
            className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-200 transition-colors duration-200 cursor-pointer"
          >
            Choose File
          </label>
          {formData.businessDocument && (
            <p className="text-xs text-blue-600 mt-2">✓ {formData.businessDocument.name}</p>
          )}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Clock className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-amber-800">Verification Process</h4>
            <p className="text-sm text-amber-700 mt-1">
              Your documents will be reviewed within 24-72 hours. You'll receive an email notification once approved. 
              Only verified property owners can list hostels on our platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Building className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Submit for Review</h2>
        <p className="text-gray-600">Review your information before submitting</p>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-500">Role</span>
            <p className="font-medium text-gray-900 capitalize">{formData.roleType}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Full Name</span>
            <p className="font-medium text-gray-900">{formData.fullName}</p>
          </div>
          {formData.businessName && (
            <div>
              <span className="text-sm text-gray-500">Business Name</span>
              <p className="font-medium text-gray-900">{formData.businessName}</p>
            </div>
          )}
          <div>
            <span className="text-sm text-gray-500">Email</span>
            <p className="font-medium text-gray-900">{formData.email}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Location</span>
            <p className="font-medium text-gray-900">{formData.city}, {formData.state}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Nearby Schools</span>
            <p className="font-medium text-gray-900">{formData.nearbySchools.length} selected</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-800">What happens next?</h4>
            <ul className="text-sm text-blue-700 mt-2 space-y-1">
              <li>• Your profile will be reviewed within 24-72 hours</li>
              <li>• You'll receive an email notification once approved</li>
              <li>• After approval, you can start listing your properties</li>
              <li>• Access tools to manage bookings and communicate with students</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <p className="text-sm text-green-800">
          By submitting, you agree to our Terms of Service and Privacy Policy. 
          You also commit to providing accurate information and maintaining property standards.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
            Property Owner Registration
          </h1>
        </div>

        {renderStepIndicator()}

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}

          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleBack}
              className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>

            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && (!formData.fullName || !formData.email || !formData.password || formData.password !== formData.confirmPassword)) ||
                  (currentStep === 2 && (!formData.state || !formData.city || formData.nearbySchools.length === 0 || !formData.propertyAddress)) ||
                  (currentStep === 3 && (!formData.governmentId || (formData.roleType === 'agent' && !formData.businessDocument)))
                }
                className="flex items-center px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200"
              >
                Submit for Review
                <CheckCircle className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}