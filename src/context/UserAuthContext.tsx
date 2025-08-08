
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
}

interface UserAuthContextType {
  currentUser: User | null;
  login: (email: string, pass: string) => boolean;
  signup: (name: string, email: string, pass: string) => boolean;
  logout: () => void;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

export const UserAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Mock login function
  const login = (email: string, pass: string): boolean => {
    // In a real app, you would verify credentials against a backend
    if (email && pass) {
      console.log(`Logging in with ${email}`);
      setCurrentUser({ name: 'Test User', email: email });
      return true;
    }
    return false;
  };
  
  // Mock signup function
  const signup = (name: string, email: string, pass: string): boolean => {
     // In a real app, you would create a new user in the backend
    if (name && email && pass) {
        console.log(`Signing up ${name} with ${email}`);
        setCurrentUser({ name, email });
        return true;
    }
    return false;
  }

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <UserAuthContext.Provider value={{ currentUser, login, signup, logout }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = (): UserAuthContextType => {
  const context = useContext(UserAuthContext);
  if (context === undefined) {
    throw new Error('useUserAuth must be used within a UserAuthProvider');
  }
  return context;
};
