export type UserRole = 'farmer' | 'buyer';

export interface User {
  id: string;
  name: string;
  mobile: string;
  location: string;
  language: string;
  role: UserRole;
}

export interface Crop {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  cropName: string;
  sowingDate: string;
  expectedHarvestDate: string;
  estimatedYield: number;
  status: 'on-track' | 'yield-reduced' | 'crop-failure';
  createdAt: string;
}

export interface CropStatus {
  id: string;
  cropId: string;
  cropName: string;
  status: 'on-track' | 'yield-reduced' | 'crop-failure';
  updateDate: string;
}

export interface FailureReport {
  id: string;
  cropId: string;
  cropName: string;
  farmerId: string;
  failureDate: string;
  failureReason: string;
  otherReason?: string;
  images: string[];
  createdAt: string;
}

export interface Agreement {
  id: string;
  agreementNumber: string;
  farmerId: string;
  farmerName: string;
  farmerLocation: string;
  buyerId: string;
  buyerName: string;
  buyerLocation: string;
  buyerPhone: string;
  cropName: string;
  quantity: number;
  pricePerKg: number;
  expectedSupplyDate: string;
  agreementText: string;
  termsAccepted: boolean;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface CompensationReport {
  id: string;
  farmerId: string;
  cropName: string;
  sowingDate: string;
  expectedHarvestDate: string;
  estimatedYield: number;
  actualYield: number;
  failureDate: string;
  failureReason: string;
  images: string[];
  createdAt: string;
}

export interface BuyerDemand {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerPhone: string;
  buyerLocation: string;
  cropName: string;
  requiredQuantity: number;
  createdAt: string;
}

export interface CropRequest {
  id: string;
  cropId: string;
  cropName: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  farmerLocation: string;
  buyerId: string;
  buyerName: string;
  buyerPhone: string;
  buyerLocation: string;
  quantity: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface CropPrice {
  cropName: string;
  todayPrice: number;
  yesterdayPrice: number;
  unit: string;
}
