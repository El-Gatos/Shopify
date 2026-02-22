'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { getCustomerAction } from '@/app/actions';

const AccountContext = createContext();
const TOKEN_KEY = 'uu_customer_token';

export function AccountProvider({ children }) {
  const [customer, setCustomer] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Rehydrate from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) { setIsLoading(false); return; }
    getCustomerAction(token).then((c) => {
      if (c) { setCustomer(c); setAccessToken(token); }
      else { localStorage.removeItem(TOKEN_KEY); }
      setIsLoading(false);
    });
  }, []);

  const login = (token, customerData) => {
    localStorage.setItem(TOKEN_KEY, token);
    setAccessToken(token);
    setCustomer(customerData);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setAccessToken(null);
    setCustomer(null);
  };

  const refreshCustomer = async () => {
    if (!accessToken) return;
    const c = await getCustomerAction(accessToken);
    if (c) setCustomer(c);
  };

  return (
    <AccountContext.Provider value={{ customer, accessToken, isLoading, login, logout, refreshCustomer }}>
      {children}
    </AccountContext.Provider>
  );
}

export const useAccount = () => useContext(AccountContext);