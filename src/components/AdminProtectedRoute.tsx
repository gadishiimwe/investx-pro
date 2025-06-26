
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();

  console.log('AdminProtectedRoute - User:', user?.email, 'Loading:', loading, 'IsAdmin:', isAdmin);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('AdminProtectedRoute - No user, redirecting to admin login');
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    console.log('AdminProtectedRoute - User is not admin, redirecting to admin login');
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
