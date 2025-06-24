import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Plus, X, CheckCircle, Home, ChevronDown } from 'lucide-react';
import { nigerianStates, amenities } from '../../data/nigeria';

interface PropertyFormData {
  name: string;
  state: string;
  city: string;
  nearbySchools: string[];
  address: string;
  rentType: 'annual' | 'monthly' | 'both';
  annualPrice: number;
  monthlyPrice: number;
  availableRooms: number;
  genderRestriction: 'female-only' | 'male-only' | 'mixed';
  selectedAmenities: string[];
  photos: File[];
  video?: File;
  description: string;
  acceptsMonthlyPayment: boolean;
}

export default function AddProperty() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PropertyFormData>({
    name: '',
    state: '',
    city: '',
    nearbySchools: [],
    address: '',
    rentType: 'annual',
    annualPrice: 0,
    monthlyPrice: 0,
    availableRooms: 1,
    genderRestriction: 'mixed',
    selectedAmenities: [],
    photos: [],
    description: '',
    acceptsMonthlyPayment: false
  });

  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showSchoolDropdown, setShowSchoolDropdown] = useState(false);
  const [citySearch, setCitySearch] = useState('');
  const [schoolSearch, setSchoolSearch] = useState('');

  const selectedState = nigerianStates.find(state => state.name === formData.state);

  // Common Nigerian cities/towns for the selected state
  const getCommonCities = (stateName: string) => {
    const cityMap: { [key: string]: string[] } = {
      'Lagos': ['Yaba', 'Akoka', 'Surulere', 'Ikeja', 'Victoria Island', 'Ikoyi', 'Lekki', 'Ajah', 'Gbagada', 'Ketu', 'Mushin', 'Alaba', 'Oshodi'],
      'Ogun': ['Abeokuta', 'Ijebu-Ode', 'Sagamu', 'Ota', 'Ilaro', 'Ayetoro', 'Iperu'],
      'Oyo': ['Ibadan', 'Ogbomoso', 'Oyo', 'Iseyin', 'Saki', 'Eruwa', 'Igboho'],
      'Abuja (FCT)': ['Garki', 'Wuse', 'Maitama', 'Asokoro', 'Gwarinpa', 'Kubwa', 'Nyanya', 'Karu'],
      'Rivers': ['Port Harcourt', 'Obio-Akpor', 'Eleme', 'Ikwerre', 'Oyigbo', 'Okrika'],
      'Kano': ['Kano Metropolitan', 'Fagge', 'Dala', 'Gwale', 'Tarauni', 'Nassarawa'],
      'Kaduna': ['Kaduna', 'Zaria', 'Kafanchan', 'Sabon Gari', 'Chikun'],
      'Plateau': ['Jos', 'Bukuru', 'Vom', 'Pankshin', 'Shendam']
    };
    return cityMap[stateName] || [];
  };

  const filteredCities = getCommonCities(formData.state).filter(city =>
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  const filteredSchools = selectedState?.institutions.filter(school =>
    school.toLowerCase().includes(schoolSearch.toLowerCase())
  ) || [];

  const handleInputChange = (field: keyof PropertyFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Reset dependent fields when state changes
    if (field === 'state') {
      setFormData(prev => ({ ...prev, city: '', nearbySchools: [] }));
      setCitySearch('');
      setSchoolSearch('');
    }
  };

  const handleCitySelect = (city: string) => {
    setFormData(prev => ({ ...prev, city }));
    setCitySearch(city);
    setShowCityDropdown(false);
  };

  const handleSchoolToggle = (school: string) => {
    setFormData(prev => ({
      ...prev,
      nearbySchools: prev.nearbySchools.includes(school)
        ? prev.nearbySchools.filter(s => s !== school)
        : [...prev.nearbySchools, school]
    }));
  };

  const handleRemoveSchool = (school: string) => {
    setFormData(prev => ({
      ...prev,
      nearbySchools: prev.nearbySchools.filter(s => s !== school)
    }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      selectedAmenities: prev.selectedAmenities.includes(amenity)
        ? prev.selectedAmenities.filter(a => a !== amenity)
        : [...prev.selectedAmenities, amenity]
    }));
  };

  const handlePhotoUpload = (files: FileList | null) => {
    if (files) {
      const newPhotos = Array.from(files).slice(0, 10 - formData.photos.length);
      setFormData(prev => ({ ...prev, photos: [...prev.photos, ...newPhotos] }));
    }
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
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
      navigate('/owner/dashboard');
    }
  };

  const handleSubmit = () => {
    // In a real app, this would submit to an API
    console.log('Property data:', formData);
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Property Information</h2>
        <p className="text-gray-600">Tell us about your property</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Property Name *</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          placeholder="e.g., Green Valley Hostel"
          required
        />
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

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">City/Town *</label>
          <div className="relative">
            <input
              type="text"
              value={citySearch}
              onChange={(e) => {
                setCitySearch(e.target.value);
                setShowCityDropdown(true);
                if (e.target.value === '') {
                  handleInputChange('city', '');
                }
              }}
              onFocus={() => setShowCityDropdown(true)}
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Type or select city/town"
              disabled={!formData.state}
              required
            />
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            
            {showCityDropdown && formData.state && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                {filteredCities.length > 0 ? (
                  filteredCities.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => handleCitySelect(city)}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                    >
                      {city}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-500 text-sm">
                    {citySearch ? 'No cities found. You can still type your city name.' : 'Start typing to search cities...'}
                  </div>
                )}
                {citySearch && !filteredCities.includes(citySearch) && citySearch.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleCitySelect(citySearch)}
                    className="w-full text-left px-4 py-3 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 border-t border-gray-200 font-medium"
                  >
                    Use "{citySearch}"
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Nearby Schools/Institutions *
        </label>
        
        {/* Selected Schools Display */}
        {formData.nearbySchools.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {formData.nearbySchools.map((school) => (
              <span
                key={school}
                className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {school}
                <button
                  type="button"
                  onClick={() => handleRemoveSchool(school)}
                  className="ml-2 w-4 h-4 text-blue-600 hover:text-blue-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* School Search Input */}
        <div className="relative">
          <input
            type="text"
            value={schoolSearch}
            onChange={(e) => {
              setSchoolSearch(e.target.value);
              setShowSchoolDropdown(true);
            }}
            onFocus={() => setShowSchoolDropdown(true)}
            className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Search and select nearby institutions..."
            disabled={!formData.state}
          />
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          
          {showSchoolDropdown && selectedState && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-64 overflow-y-auto">
              {filteredSchools.length > 0 ? (
                filteredSchools.map((school) => (
                  <button
                    key={school}
                    type="button"
                    onClick={() => {
                      handleSchoolToggle(school);
                      setSchoolSearch('');
                      setShowSchoolDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-3 transition-colors duration-200 border-b border-gray-100 last:border-b-0 ${
                      formData.nearbySchools.includes(school)
                        ? 'bg-blue-50 text-blue-700'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{school}</span>
                      {formData.nearbySchools.includes(school) && (
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-gray-500 text-sm">
                  {schoolSearch ? 'No institutions found matching your search.' : 'Start typing to search institutions...'}
                </div>
              )}
            </div>
          )}
        </div>
        
        <p className="text-xs text-gray-500 mt-2">
          Select all institutions your property can serve. Students from these schools will see your listing.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Property Address *</label>
        <textarea
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          placeholder="Enter complete property address"
          required
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pricing & Room Details</h2>
        <p className="text-gray-600">Set your pricing and room information</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Rent Type *</label>
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: 'annual', label: 'Annual Only' },
            { value: 'monthly', label: 'Monthly Only' },
            { value: 'both', label: 'Both Options' }
          ].map((option) => (
            <label
              key={option.value}
              className={`flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                formData.rentType === option.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="rentType"
                value={option.value}
                checked={formData.rentType === option.value}
                onChange={(e) => handleInputChange('rentType', e.target.value as any)}
                className="sr-only"
              />
              <span className="text-sm font-medium">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Annual Rent (₦) *</label>
          <input
            type="number"
            value={formData.annualPrice || ''}
            onChange={(e) => handleInputChange('annualPrice', parseInt(e.target.value) || 0)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="150000"
            min="0"
            required
          />
        </div>

        {(formData.rentType === 'monthly' || formData.rentType === 'both') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Rent (₦)</label>
            <input
              type="number"
              value={formData.monthlyPrice || ''}
              onChange={(e) => handleInputChange('monthlyPrice', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="15000"
              min="0"
            />
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Available Rooms *</label>
          <input
            type="number"
            value={formData.availableRooms}
            onChange={(e) => handleInputChange('availableRooms', parseInt(e.target.value) || 1)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            min="1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gender Restriction *</label>
          <select
            value={formData.genderRestriction}
            onChange={(e) => handleInputChange('genderRestriction', e.target.value as any)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          >
            <option value="mixed">Mixed (Both Male & Female)</option>
            <option value="female-only">Female Only</option>
            <option value="male-only">Male Only</option>
          </select>
        </div>
      </div>

      {(formData.rentType === 'monthly' || formData.rentType === 'both') && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={formData.acceptsMonthlyPayment}
              onChange={(e) => handleInputChange('acceptsMonthlyPayment', e.target.checked)}
              className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-900">Accept Monthly Payments via FlexiHostel</span>
              <p className="text-xs text-gray-600 mt-1">
                FlexiHostel will pay you the full annual rent upfront, and collect monthly payments from students. 
                Small service fee applies.
              </p>
            </div>
          </label>
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Amenities & Features</h2>
        <p className="text-gray-600">Select available amenities in your property</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">Available Amenities</label>
        <div className="grid md:grid-cols-3 gap-3">
          {amenities.map((amenity) => (
            <label
              key={amenity}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                formData.selectedAmenities.includes(amenity)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.selectedAmenities.includes(amenity)}
                onChange={() => handleAmenityToggle(amenity)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-3"
              />
              <span className="text-sm">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Property Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          placeholder="Describe your property, its unique features, rules, and what makes it special for students..."
        />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Photos & Media</h2>
        <p className="text-gray-600">Upload photos to showcase your property</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">Property Photos (Max 10)</label>
        
        {formData.photos.length < 10 && (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-300 transition-colors duration-200 mb-4">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-600 mb-4">
              Drag and drop photos here, or click to select files
            </p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handlePhotoUpload(e.target.files)}
              className="hidden"
              id="photos"
            />
            <label
              htmlFor="photos"
              className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-200 transition-colors duration-200 cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-2" />
              Choose Photos
            </label>
          </div>
        )}

        {formData.photos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.photos.map((photo, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(photo)}
                  alt={`Property photo ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <p className="text-sm text-green-800">
          <strong>Ready to publish!</strong> Your property will be reviewed and published within 24 hours. 
          You'll receive an email notification once it\'s live.
        </p>
      </div>
    </div>
  );

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.relative')) {
        setShowCityDropdown(false);
        setShowSchoolDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
            Add New Property
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
                  (currentStep === 1 && (!formData.name || !formData.state || !formData.city || formData.nearbySchools.length === 0 || !formData.address)) ||
                  (currentStep === 2 && (!formData.annualPrice || formData.availableRooms < 1))
                }
                className="flex items-center px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200"
              >
                Continue
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200"
              >
                Publish Property
                <CheckCircle className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}