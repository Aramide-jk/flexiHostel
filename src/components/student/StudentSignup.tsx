import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Upload, CheckCircle, GraduationCap } from 'lucide-react';
import { nigerianStates, academicLevels } from '../../data/nigeria';
import { useAuth } from '../../contexts/AuthContext';

interface StudentFormData {
  // Step 1: Location & Institution
  state: string;
  institution: string;
  academicLevel: string;
  interestedInMonthlyRent: boolean;
  
  // Step 2: Personal Information
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female' | 'prefer-not-to-say';
  preferredHostelType: 'female-only' | 'male-only' | 'mixed';
  
  // Step 3: Verification
  studentId: File | null;
  admissionLetter: File | null;
}

export default function StudentSignup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<StudentFormData>({
    state: '',
    institution: '',
    academicLevel: '',
    interestedInMonthlyRent: false,
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: 'prefer-not-to-say',
    preferredHostelType: 'mixed',
    studentId: null,
    admissionLetter: null
  });

  const selectedState = nigerianStates.find(state => state.name === formData.state);

  const handleInputChange = (field: keyof StudentFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: 'studentId' | 'admissionLetter', file: File | null) => {
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
    // Create user object and login
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      email: formData.email,
      fullName: formData.fullName,
      role: 'student' as const,
      verified: false,
      profileComplete: true,
      state: formData.state,
      institution: formData.institution,
      academicLevel: formData.academicLevel,
      gender: formData.gender,
      preferredHostelType: formData.preferredHostelType,
      interestedInMonthlyRent: formData.interestedInMonthlyRent
    };

    login(user);
    navigate('/student/dashboard');
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <React.Fragment key={step}>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
            step === currentStep 
              ? 'bg-emerald-500 border-emerald-500 text-white' 
              : step < currentStep 
                ? 'bg-emerald-100 border-emerald-500 text-emerald-600'
                : 'bg-gray-100 border-gray-300 text-gray-400'
          }`}>
            {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
          </div>
          {step < 4 && (
            <div className={`w-12 h-0.5 mx-2 transition-all duration-300 ${
              step < currentStep ? 'bg-emerald-500' : 'bg-gray-200'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Your Location & Institution</h2>
        <p className="text-gray-600">Help us find hostels near your school</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
          <select
            value={formData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
            required
          >
            <option value="">Select your state</option>
            {nigerianStates.map((state) => (
              <option key={state.name} value={state.name}>{state.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Institution *</label>
          <select
            value={formData.institution}
            onChange={(e) => handleInputChange('institution', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
            required
            disabled={!formData.state}
          >
            <option value="">Select your institution</option>
            {selectedState?.institutions.map((institution) => (
              <option key={institution} value={institution}>{institution}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Academic Level (Optional)</label>
        <select
          value={formData.academicLevel}
          onChange={(e) => handleInputChange('academicLevel', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
        >
          <option value="">Select your level</option>
          {academicLevels.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={formData.interestedInMonthlyRent}
            onChange={(e) => handleInputChange('interestedInMonthlyRent', e.target.checked)}
            className="mt-1 w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
          />
          <div>
            <span className="text-sm font-medium text-gray-900">Interested in Monthly Rent Option</span>
            <p className="text-xs text-gray-600 mt-1">
              Pay monthly instead of full year upfront. Small processing fee applies.
            </p>
          </div>
        </label>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">Tell us a bit about yourself</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
          placeholder="Enter your full name"
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
            placeholder="your@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value as any)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="prefer-not-to-say">Prefer Not to Say</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
            placeholder="Confirm your password"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Hostel Type</label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'female-only', label: 'Female Only' },
            { value: 'male-only', label: 'Male Only' },
            { value: 'mixed', label: 'Mixed' }
          ].map((option) => (
            <label
              key={option.value}
              className={`flex items-center justify-center p-3 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                formData.preferredHostelType === option.value
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="preferredHostelType"
                value={option.value}
                checked={formData.preferredHostelType === option.value}
                onChange={(e) => handleInputChange('preferredHostelType', e.target.value as any)}
                className="sr-only"
              />
              <span className="text-sm font-medium">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Student Verification</h2>
        <p className="text-gray-600">Upload documents to verify your student status (Optional for now)</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-emerald-300 transition-colors duration-200">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
          <h3 className="text-sm font-medium text-gray-900 mb-2">Student ID Card</h3>
          <p className="text-xs text-gray-500 mb-4">Upload a clear photo of your student ID</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload('studentId', e.target.files?.[0] || null)}
            className="hidden"
            id="studentId"
          />
          <label
            htmlFor="studentId"
            className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-lg hover:bg-emerald-200 transition-colors duration-200 cursor-pointer"
          >
            Choose File
          </label>
          {formData.studentId && (
            <p className="text-xs text-emerald-600 mt-2">✓ {formData.studentId.name}</p>
          )}
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-emerald-300 transition-colors duration-200">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
          <h3 className="text-sm font-medium text-gray-900 mb-2">Admission Letter</h3>
          <p className="text-xs text-gray-500 mb-4">Upload your admission letter (Alternative)</p>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => handleFileUpload('admissionLetter', e.target.files?.[0] || null)}
            className="hidden"
            id="admissionLetter"
          />
          <label
            htmlFor="admissionLetter"
            className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-lg hover:bg-emerald-200 transition-colors duration-200 cursor-pointer"
          >
            Choose File
          </label>
          {formData.admissionLetter && (
            <p className="text-xs text-emerald-600 mt-2">✓ {formData.admissionLetter.name}</p>
          )}
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> Document verification is optional for now. You can complete this later in your profile settings. 
          Verified accounts get priority in hostel applications.
        </p>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <GraduationCap className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to Get Started!</h2>
        <p className="text-gray-600">Review your information and complete your registration</p>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-500">Full Name</span>
            <p className="font-medium text-gray-900">{formData.fullName}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Email</span>
            <p className="font-medium text-gray-900">{formData.email}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">State</span>
            <p className="font-medium text-gray-900">{formData.state}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Institution</span>
            <p className="font-medium text-gray-900">{formData.institution}</p>
          </div>
        </div>
        
        {formData.interestedInMonthlyRent && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-700">✓ Interested in monthly rent option</p>
          </div>
        )}
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
        <p className="text-sm text-emerald-800">
          By completing registration, you agree to our Terms of Service and Privacy Policy. 
          You'll have access to verified hostels near your institution.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Student Registration
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
                  (currentStep === 1 && (!formData.state || !formData.institution)) ||
                  (currentStep === 2 && (!formData.fullName || !formData.email || !formData.password || formData.password !== formData.confirmPassword))
                }
                className="flex items-center px-8 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center px-8 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-200"
              >
                Complete Registration
                <CheckCircle className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}