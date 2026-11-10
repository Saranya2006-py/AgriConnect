import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Crop, BuyerDemand, Agreement, FailureReport, CompensationReport, CropPrice, CropRequest } from '@/types';

interface DataContextType {
  crops: Crop[];
  demands: BuyerDemand[];
  agreements: Agreement[];
  failureReports: FailureReport[];
  compensationReports: CompensationReport[];
  prices: CropPrice[];
  cropRequests: CropRequest[];
  addCrop: (crop: Omit<Crop, 'id' | 'createdAt'>) => void;
  updateCropStatus: (cropId: string, status: Crop['status']) => void;
  addDemand: (demand: Omit<BuyerDemand, 'id' | 'createdAt'>) => void;
  addAgreement: (agreement: Omit<Agreement, 'id' | 'createdAt'>) => void;
  updateAgreementStatus: (agreementId: string, status: Agreement['status']) => void;
  addFailureReport: (report: Omit<FailureReport, 'id' | 'createdAt'>) => void;
  addCompensationReport: (report: Omit<CompensationReport, 'id' | 'createdAt'>) => void;
  addCropRequest: (request: Omit<CropRequest, 'id' | 'createdAt'>) => void;
  updateCropRequestStatus: (requestId: string, status: CropRequest['status']) => void;
  getFailureReportByCropId: (cropId: string) => FailureReport | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialPrices: CropPrice[] = [
  { cropName: 'Wheat', todayPrice: 2450, yesterdayPrice: 2380, unit: 'per quintal' },
  { cropName: 'Rice', todayPrice: 3200, yesterdayPrice: 3250, unit: 'per quintal' },
  { cropName: 'Cotton', todayPrice: 6800, yesterdayPrice: 6650, unit: 'per quintal' },
  { cropName: 'Sugarcane', todayPrice: 350, yesterdayPrice: 340, unit: 'per quintal' },
  { cropName: 'Soybean', todayPrice: 4500, yesterdayPrice: 4400, unit: 'per quintal' },
  { cropName: 'Maize', todayPrice: 2100, yesterdayPrice: 2150, unit: 'per quintal' },
  { cropName: 'Groundnut', todayPrice: 5800, yesterdayPrice: 5700, unit: 'per quintal' },
  { cropName: 'Mustard', todayPrice: 5200, yesterdayPrice: 5150, unit: 'per quintal' },
];

export function DataProvider({ children }: { children: ReactNode }) {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [demands, setDemands] = useState<BuyerDemand[]>([]);
  const [agreements, setAgreements] = useState<Agreement[]>([]);
  const [failureReports, setFailureReports] = useState<FailureReport[]>([]);
  const [compensationReports, setCompensationReports] = useState<CompensationReport[]>([]);
  const [cropRequests, setCropRequests] = useState<CropRequest[]>([]);
  const [prices] = useState<CropPrice[]>(initialPrices);

  useEffect(() => {
    const storedCrops = localStorage.getItem('crops');
    const storedDemands = localStorage.getItem('demands');
    const storedAgreements = localStorage.getItem('agreements');
    const storedFailures = localStorage.getItem('failureReports');
    const storedCompensations = localStorage.getItem('compensationReports');
    const storedRequests = localStorage.getItem('cropRequests');

    if (storedCrops) setCrops(JSON.parse(storedCrops));
    if (storedDemands) setDemands(JSON.parse(storedDemands));
    if (storedAgreements) setAgreements(JSON.parse(storedAgreements));
    if (storedFailures) setFailureReports(JSON.parse(storedFailures));
    if (storedCompensations) setCompensationReports(JSON.parse(storedCompensations));
    if (storedRequests) setCropRequests(JSON.parse(storedRequests));
  }, []);

  const saveToStorage = (key: string, data: unknown) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const addCrop = (crop: Omit<Crop, 'id' | 'createdAt'>) => {
    const newCrop: Crop = {
      ...crop,
      id: `crop_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updatedCrops = [...crops, newCrop];
    setCrops(updatedCrops);
    saveToStorage('crops', updatedCrops);
  };

  const updateCropStatus = (cropId: string, status: Crop['status']) => {
    const updatedCrops = crops.map(crop =>
      crop.id === cropId ? { ...crop, status } : crop
    );
    setCrops(updatedCrops);
    saveToStorage('crops', updatedCrops);
  };

  const addDemand = (demand: Omit<BuyerDemand, 'id' | 'createdAt'>) => {
    const newDemand: BuyerDemand = {
      ...demand,
      id: `demand_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updatedDemands = [...demands, newDemand];
    setDemands(updatedDemands);
    saveToStorage('demands', updatedDemands);
  };

  const addAgreement = (agreement: Omit<Agreement, 'id' | 'createdAt'>) => {
    const newAgreement: Agreement = {
      ...agreement,
      id: `agreement_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updatedAgreements = [...agreements, newAgreement];
    setAgreements(updatedAgreements);
    saveToStorage('agreements', updatedAgreements);
  };

  const updateAgreementStatus = (agreementId: string, status: Agreement['status']) => {
    const updatedAgreements = agreements.map(agreement =>
      agreement.id === agreementId ? { ...agreement, status } : agreement
    );
    setAgreements(updatedAgreements);
    saveToStorage('agreements', updatedAgreements);
  };

  const addFailureReport = (report: Omit<FailureReport, 'id' | 'createdAt'>) => {
    const newReport: FailureReport = {
      ...report,
      id: `failure_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updatedReports = [...failureReports, newReport];
    setFailureReports(updatedReports);
    saveToStorage('failureReports', updatedReports);
  };

  const addCompensationReport = (report: Omit<CompensationReport, 'id' | 'createdAt'>) => {
    const newReport: CompensationReport = {
      ...report,
      id: `compensation_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updatedReports = [...compensationReports, newReport];
    setCompensationReports(updatedReports);
    saveToStorage('compensationReports', updatedReports);
  };

  const addCropRequest = (request: Omit<CropRequest, 'id' | 'createdAt'>) => {
    const newRequest: CropRequest = {
      ...request,
      id: `request_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updatedRequests = [...cropRequests, newRequest];
    setCropRequests(updatedRequests);
    saveToStorage('cropRequests', updatedRequests);
  };

  const updateCropRequestStatus = (requestId: string, status: CropRequest['status']) => {
    const updatedRequests = cropRequests.map(request =>
      request.id === requestId ? { ...request, status } : request
    );
    setCropRequests(updatedRequests);
    saveToStorage('cropRequests', updatedRequests);
  };

  const getFailureReportByCropId = (cropId: string) => {
    return failureReports.find(report => report.cropId === cropId);
  };

  return (
    <DataContext.Provider value={{
      crops,
      demands,
      agreements,
      failureReports,
      compensationReports,
      prices,
      cropRequests,
      addCrop,
      updateCropStatus,
      addDemand,
      addAgreement,
      updateAgreementStatus,
      addFailureReport,
      addCompensationReport,
      addCropRequest,
      updateCropRequestStatus,
      getFailureReportByCropId,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
