import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to={user?.role === 'farmer' ? '/farmer' : '/buyer'} replace />;
  }
  
  return <Navigate to="/" replace />;
};

export default Index;
