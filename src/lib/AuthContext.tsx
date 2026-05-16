import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';

interface AuthContextType {
  user: any;
  loading: boolean;
  isGuest: boolean;
}

const GUEST_USER = {
  uid: 'guest-alchemist',
  displayName: 'Elite Neural Analyst',
  email: 'guest@omniscience.local',
  photoURL: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop',
};

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, isGuest: false });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const bypass = sessionStorage.getItem('omniscience_bypass') === 'true';
    if (bypass) {
      setUser(GUEST_USER);
      setIsGuest(true);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsGuest(false);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isGuest }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
