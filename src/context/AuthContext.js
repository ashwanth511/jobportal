"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userTrade, setUserTrade] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);
    checkUser();
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const userFromCookie = Cookies.get('user');
    if (userFromCookie) {
      const parsedUser = JSON.parse(userFromCookie);
      setUser(parsedUser);
      setUserRole(parsedUser.role);
      setUserTrade(parsedUser.trade);
    }
  }, []);

  async function checkUser() {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const { user } = session;
      setUser(user);
      const { data } = await supabase
        .from('profiles')
        .select('role, trade')
        .eq('id', user.id)
        .single();
      
      setUserRole(data?.role);
      setUserTrade(data?.trade);
      Cookies.set('user', JSON.stringify({
        id: user.id,
        email: user.email,
        role: data?.role,
        trade: data?.trade
      }), { expires: 7, secure: true, sameSite: 'strict' });
    } else {
      setUser(null);
      setUserRole(null);
      setUserTrade(null);
      Cookies.remove('user');
    }
    setLoading(false);
  }

  async function handleAuthChange(event, session) {
    if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
      await checkUser();
    } else if (event === 'SIGNED_OUT') {
      setUser(null);
      setUserRole(null);
      setUserTrade(null);
      Cookies.remove('user');
      router.push('/');
    }
  }

  const signUp = async ({ email, password, options }) => {
    const { data, error } = await supabase.auth.signUp({ email, password, options });
    if (error) throw error;
    await checkUser();
    return data;
  };

  const signIn = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    await checkUser();
    return data;
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setUserRole(null);
      setUserTrade(null);
      Cookies.remove('user');
      await checkUser();
      router.push('/');
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  const value = {
    user,
    userRole,
    userTrade,
    loading,
    signUp,
    signOut,
    signIn,
    setUser,
    setUserRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}


export const useAuth = () => useContext(AuthContext);
