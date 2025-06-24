import { useState, useEffect } from 'react';
import { User } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate authentication check
    setTimeout(() => {
      setUser({
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin'
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const login = (email: string, password: string) => {
    // Simulate login
    setUser({
      id: '1',
      name: 'Admin User',
      email: email,
      role: 'admin'
    });
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    isLoading,
    login,
    logout
  };
};