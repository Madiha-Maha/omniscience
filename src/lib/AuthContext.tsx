import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  user: any;
  loading: boolean;
  isGuest: boolean;
}

const EXECUTIVE_USER = {
  uid: 'executive-director-01',
  displayName: 'Executive Director',
  email: 'director@omniscience.ai',
  photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
};

const AuthContext = createContext<AuthContextType>({ 
  user: EXECUTIVE_USER, 
  loading: false, 
  isGuest: true 
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user] = useState<any>(EXECUTIVE_USER);

  return (
    <AuthContext.Provider value={{ user, loading: false, isGuest: true }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

