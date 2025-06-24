export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'student' | 'owner' | 'agent';
  verified: boolean;
  profileComplete: boolean;
}

export interface Student extends User {
  role: 'student';
  state: string;
  institution: string;
  academicLevel?: string;
  gender: 'male' | 'female' | 'prefer-not-to-say';
  preferredHostelType: 'female-only' | 'male-only' | 'mixed';
  interestedInMonthlyRent: boolean;
  studentId?: string;
}

export interface PropertyOwner extends User {
  role: 'owner' | 'agent';
  businessName?: string;
  state: string;
  city: string;
  nearbySchools: string[];
  propertyAddress: string;
  kycDocuments: string[];
  approvalStatus: 'pending' | 'approved' | 'rejected';
}

export interface Hostel {
  id: string;
  ownerId: string;
  name: string;
  state: string;
  city: string;
  nearbySchools: string[];
  address: string;
  rentType: 'annual' | 'monthly' | 'both';
  annualPrice: number;
  monthlyPrice?: number;
  availableRooms: number;
  genderRestriction: 'female-only' | 'male-only' | 'mixed';
  amenities: string[];
  photos: string[];
  video?: string;
  rating: number;
  reviews: number;
  verified: boolean;
  acceptsMonthlyPayment: boolean;
}

export interface NigerianState {
  name: string;
  institutions: string[];
}