import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthContextProps {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithEmail: (email: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);

        if (event === 'SIGNED_IN' && session) {
          setTimeout(() => {
            checkUserProfile(session.user.id);
          }, 0);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (session?.user) {
        checkUserProfile(session.user.id);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const checkUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error checking profile:', error);
        return;
      }

      if (!data) {
        console.log('User needs to create profile. Redirecting...');
        navigate('/register-profile');
      }
    } catch (error) {
      console.error('Error in checkUserProfile:', error);
    }
  };

  const signInWithEmail = async (email: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({ 
        email,
        options: {
          emailRedirectTo: window.location.origin
        }
      });

      if (error) {
        toast.error(error.message);
        throw error;
      }
      
      toast.success('Check your email for the login link!');
    } catch (error) {
      console.error('Error in signInWithEmail:', error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });

      if (error) {
        console.error('Google OAuth Error Details:', {
          message: error.message,
          status: error.status,
          cause: error.cause
        });
        toast.error(`Google Sign-In Failed: ${error.message}`);
        throw error;
      }

      console.log('Google OAuth Initiated:', data);
    } catch (error) {
      console.error('Unexpected Google OAuth Error:', error);
      toast.error('An unexpected error occurred during Google Sign-In');
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error(error.message);
        throw error;
      }
      navigate('/login');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Error in signOut:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        session, 
        loading, 
        signInWithEmail, 
        signInWithGoogle, 
        signOut 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
