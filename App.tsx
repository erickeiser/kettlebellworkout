
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import DashboardPage from './pages/DashboardPage';
import WorkoutPage from './pages/WorkoutPage';
import ProgressPage from './pages/ProgressPage';
import AuthPage from './pages/AuthPage';
import LandingPage from './pages/LandingPage';
import Header from './components/Header';

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/auth" />;
};

const AppRoutes: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-brand-dark">
            {user && <Header />}
            <main>
                <Routes>
                    <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/dashboard" />} />
                    <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/dashboard" />} />
                    <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                    <Route path="/workout/:week/:day" element={<ProtectedRoute><WorkoutPage /></ProtectedRoute>} />
                    <Route path="/progress" element={<ProtectedRoute><ProgressPage /></ProtectedRoute>} />
                    {/* A simple admin route could be added here */}
                    {/* <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} /> */}
                </Routes>
            </main>
        </div>
    );
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
