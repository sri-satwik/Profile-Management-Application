import React from 'react';
import AppRoutes from './routes';
import { ProfileProvider } from './context/ProfileContext';

const App: React.FC = () => {
  return (
    <ProfileProvider>
      <AppRoutes />
    </ProfileProvider>
  );
};

export default App;
