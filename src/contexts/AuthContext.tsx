import { createContext, ReactNode, useEffect, useState } from 'react';

import Router from 'next/router';
import { destroyCookie, setCookie,parseCookies } from 'nookies';
import { api } from '../services/apiClient';

type User = {
  name: string;
  email: string;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
  user: User;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);


export function signOut() {
  destroyCookie(undefined, 'mkseguros-admin.token');

  Router.push('/');
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const cookies = parseCookies();
    const {'mkseguros-admin.token':token} = cookies;
  
    if (token) {
      api.get('/me').then((response) =>{
        const {name,email}=response.data;
        setUser(()=>{
          return {
            name,
            email
          }
        });
      }).catch(() =>{
        signOut();
      })
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/login', {
        email,
        password
      });

      const { token:{ token },user:{name} } = response.data;

      setCookie(undefined, 'mkseguros-admin.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      });

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      setUser({
        name,
        email,
      });

      Router.push('/messages');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}

function setUser(arg0: () => { name: any; email: any; }) {
  throw new Error('Function not implemented.');
}
