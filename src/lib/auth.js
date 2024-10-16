import { supabase } from './supabase';
import Cookies from 'js-cookie';

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, trade')
    .eq('id', user.id)
    .single();

  return {
    id: user.id,
    email: user.email,
    role: profile?.role,
    trade: profile?.trade,
  };
}

export function getUserFromCookie() {
  const userCookie = Cookies.get('user');
  return userCookie ? JSON.parse(userCookie) : null;
}

export function setUserCookie(user) {
  Cookies.set('user', JSON.stringify(user), { expires: 7, secure: true, sameSite: 'strict' });
}

export function removeUserCookie() {
  Cookies.remove('user');
}

// server side

export async function verifySession(req) {
  const { data: { session } } = await supabase.auth.getSession(req);
 if(!session) {
  return null;
 }

 const userFromCookie=req.cookies.get('user');
 if(!userFromCookie) {
  return null;
 }

 const parsedUser=JSON.parse(userFromCookie);
if(session.user.id !== parsedUser.id) {
  return null;
}





  return session;
}