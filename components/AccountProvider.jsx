'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { getCustomerAction } from '../app/actions';

const AccountContext = createContext();
const TOKEN_KEY = 'uu_customer_token';
const TOKEN_EXPIRY_KEY = 'uu_customer_token_expiry';

export function AccountProvider({ children }) {
  const [customer, setCustomer] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);

    // Clear token if it's expired
    if (!token || (expiry && Date.now() > parseInt(expiry))) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(TOKEN_EXPIRY_KEY);
      setIsLoading(false);
      return;
    }

    getCustomerAction(token).then((c) => {
      if (c) { setCustomer(c); setAccessToken(token); }
      else {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(TOKEN_EXPIRY_KEY);
      }
      setIsLoading(false);
    });
  }, []);

  const login = (token, customerData, expiresAt) => {
    localStorage.setItem(TOKEN_KEY, token);
    if (expiresAt) localStorage.setItem(TOKEN_EXPIRY_KEY, new Date(expiresAt).getTime().toString());
    setAccessToken(token);
    setCustomer(customerData);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
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