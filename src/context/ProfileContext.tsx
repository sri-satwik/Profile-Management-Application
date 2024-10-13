import React, { createContext, useState, ReactNode } from 'react';

interface Profile {
  id?: number;
  name: string;
  email: string;
  age?: string;
}

interface ProfileContextType {
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
}

export const ProfileContext = createContext<ProfileContextType>({ profile: null, setProfile: () => {} });

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
