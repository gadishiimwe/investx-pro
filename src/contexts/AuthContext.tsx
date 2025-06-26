
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  referral_code: string;
  referred_by?: string;
  wallet_balance: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  isAdmin: boolean;
  signUp: (email: string, password: string, firstName: string, lastName: string, phone: string, referralCode?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  adminSignIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Clean up auth state utility
const cleanupAuthState = () => {
  localStorage.removeItem('supabase.auth.token');
  localStorage.removeItem('userType');
  localStorage.removeItem('isAuthenticated');
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setProfile(null);
    }
  };

  const checkAdminStatus = (userEmail: string) => {
    // Check if user is admin based on email
    const adminEmails = ['admin@investx.rw'];
    return adminEmails.includes(userEmail);
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const adminStatus = checkAdminStatus(session.user.email || '');
          setIsAdmin(adminStatus);
          
          if (adminStatus) {
            localStorage.setItem('userType', 'admin');
            localStorage.setItem('isAuthenticated', 'true');
          } else {
            localStorage.removeItem('userType');
            localStorage.removeItem('isAuthenticated');
          }
          
          // Defer profile fetching for non-admin users
          if (!adminStatus) {
            setTimeout(() => {
              fetchProfile(session.user.id);
            }, 0);
          }
        } else {
          setProfile(null);
          setIsAdmin(false);
          localStorage.removeItem('userType');
          localStorage.removeItem('isAuthenticated');
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const adminStatus = checkAdminStatus(session.user.email || '');
        setIsAdmin(adminStatus);
        
        if (adminStatus) {
          localStorage.setItem('userType', 'admin');
          localStorage.setItem('isAuthenticated', 'true');
        } else if (!adminStatus) {
          fetchProfile(session.user.id);
        }
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, firstName: string, lastName: string, phone: string, referralCode?: string) => {
    try {
      cleanupAuthState();
      
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            referral_code: referralCode || null
          }
        }
      });

      return { error };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      cleanupAuthState();
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      if (data.user) {
        // Check if admin
        const adminStatus = checkAdminStatus(data.user.email || '');
        if (adminStatus) {
          window.location.href = '/admin/dashboard';
        } else {
          window.location.href = '/dashboard';
        }
      }

      return { error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error };
    }
  };

  const adminSignIn = async (email: string, password: string) => {
    try {
      cleanupAuthState();
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      if (data.user) {
        const adminStatus = checkAdminStatus(data.user.email || '');
        if (adminStatus) {
          setIsAdmin(true);
          localStorage.setItem('userType', 'admin');
          localStorage.setItem('isAuthenticated', 'true');
          return { error: null };
        } else {
          await supabase.auth.signOut();
          return { error: { message: 'Access denied. Admin credentials required.' } };
        }
      }

      return { error: null };
    } catch (error) {
      console.error('Admin sign in error:', error);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      cleanupAuthState();
      await supabase.auth.signOut({ scope: 'global' });
      setUser(null);
      setSession(null);
      setProfile(null);
      setIsAdmin(false);
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      loading,
      isAdmin,
      signUp,
      signIn,
      adminSignIn,
      signOut,
      refreshProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};
