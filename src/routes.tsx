import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import ProfileForm from './components/ProfileForm';
import ProfileDisplay from './components/ProfileDisplay';
import NotFound from './components/NotFound';

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      {/* Redirect the root path to the ProfileForm */}
      <Route path="/" element={<Navigate to="/profile-form" replace />} />
      <Route path="/profile-form" element={<ProfileForm />} />
      <Route path="/profile" element={<ProfileDisplay />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
