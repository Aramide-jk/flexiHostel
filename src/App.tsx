import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Welcome from './components/Welcome';
import StudentSignup from './components/student/StudentSignup';
import OwnerSignup from './components/owner/OwnerSignup';
import Login from './components/auth/Login';
import StudentDashboard from './components/student/StudentDashboard';
import OwnerDashboard from './components/owner/OwnerDashboard';
import HostelDetails from './components/hostels/HostelDetails';
import AddProperty from './components/owner/AddProperty';
import PaymentSetup from './components/payments/PaymentSetup';

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

function AppRouter() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to={`/${user.role}/dashboard`} replace /> : <Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup/student" element={<StudentSignup />} />
        <Route path="/signup/owner" element={<OwnerSignup />} />
        
        <Route 
          path="/student/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/owner/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['owner', 'agent']}>
              <OwnerDashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/owner/add-property" 
          element={
            <ProtectedRoute allowedRoles={['owner', 'agent']}>
              <AddProperty />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/hostel/:id" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <HostelDetails />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/payments/setup" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <PaymentSetup />
            </ProtectedRoute>
          } 
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;