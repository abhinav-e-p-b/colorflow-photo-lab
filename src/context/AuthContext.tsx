
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";

interface User {
  username: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Check if user was previously authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        
        if (data.session) {
          const { user } = data.session;
          setUser({
            username: user.email?.split('@')[0] || 'User',
            email: user.email
          });
        }
      } catch (error) {
        console.error('Auth check error:', error);
      }
    };
    
    checkAuth();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event);
        
        if (session && session.user) {
          setUser({
            username: session.user.email?.split('@')[0] || 'User',
            email: session.user.email
          });
        } else {
          setUser(null);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // For compatibility, if the input doesn't look like an email, append a fake domain
      const loginEmail = email.includes('@') ? email : `${email}@example.com`;
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: password
      });
      
      if (error) {
        console.error('Login error:', error.message);
        toast.error(error.message);
        return false;
      }
      
      if (data.user) {
        setUser({
          username: data.user.email?.split('@')[0] || 'User',
          email: data.user.email
        });
        return true;
      }
      
      return false;
    } catch (error: any) {
      console.error('Login error:', error.message);
      toast.error(error.message || 'Login failed');
      return false;
    }
  };

  const signup = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });
      
      if (error) {
        console.error('Signup error:', error.message);
        toast.error(error.message);
        return false;
      }
      
      if (data.user) {
        toast.success("Signup successful! Please check your email for verification.");
        return true;
      }
      
      return false;
    } catch (error: any) {
      console.error('Signup error:', error.message);
      toast.error(error.message || 'Signup failed');
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error: any) {
      console.error('Logout error:', error.message);
      toast.error(error.message || 'Logout failed');
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
