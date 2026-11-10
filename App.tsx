import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";

import Login from "./pages/Login";
import Profile from "./pages/Profile";
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import MyCrops from "./pages/farmer/MyCrops";
import CropRegistration from "./pages/farmer/CropRegistration";
import CropStatus from "./pages/farmer/CropStatus";
import FailureReport from "./pages/farmer/FailureReport";
import Agreements from "./pages/farmer/Agreements";
import Compensation from "./pages/farmer/Compensation";
import BuyerDemands from "./pages/farmer/BuyerDemands";
import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import AvailableCrops from "./pages/buyer/AvailableCrops";
import RegisterDemand from "./pages/buyer/RegisterDemand";
import BuyerAgreements from "./pages/buyer/BuyerAgreements";
import PriceGuidancePage from "./pages/PriceGuidancePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children, requiredRole }: { children: React.ReactNode; requiredRole?: 'farmer' | 'buyer' }) {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to={user?.role === 'farmer' ? '/farmer' : '/buyer'} replace />;
  }
  
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to={user?.role === 'farmer' ? '/farmer' : '/buyer'} replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
      
      {/* Shared Routes */}
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/price-guidance" element={<ProtectedRoute><PriceGuidancePage /></ProtectedRoute>} />
      
      {/* Farmer Routes */}
      <Route path="/farmer" element={<ProtectedRoute requiredRole="farmer"><FarmerDashboard /></ProtectedRoute>} />
      <Route path="/farmer/my-crops" element={<ProtectedRoute requiredRole="farmer"><MyCrops /></ProtectedRoute>} />
      <Route path="/farmer/crop-registration" element={<ProtectedRoute requiredRole="farmer"><CropRegistration /></ProtectedRoute>} />
      <Route path="/farmer/crop-status" element={<ProtectedRoute requiredRole="farmer"><CropStatus /></ProtectedRoute>} />
      <Route path="/farmer/failure-report" element={<ProtectedRoute requiredRole="farmer"><FailureReport /></ProtectedRoute>} />
      <Route path="/farmer/agreements" element={<ProtectedRoute requiredRole="farmer"><Agreements /></ProtectedRoute>} />
      <Route path="/farmer/compensation" element={<ProtectedRoute requiredRole="farmer"><Compensation /></ProtectedRoute>} />
      <Route path="/farmer/buyer-demands" element={<ProtectedRoute requiredRole="farmer"><BuyerDemands /></ProtectedRoute>} />
      
      {/* Buyer Routes */}
      <Route path="/buyer" element={<ProtectedRoute requiredRole="buyer"><BuyerDashboard /></ProtectedRoute>} />
      <Route path="/buyer/available-crops" element={<ProtectedRoute requiredRole="buyer"><AvailableCrops /></ProtectedRoute>} />
      <Route path="/buyer/register-demand" element={<ProtectedRoute requiredRole="buyer"><RegisterDemand /></ProtectedRoute>} />
      <Route path="/buyer/agreements" element={<ProtectedRoute requiredRole="buyer"><BuyerAgreements /></ProtectedRoute>} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <DataProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
