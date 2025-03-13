'use client';

import React, { createContext, useContext } from 'react';
import type User from '@/libs/contexts/userType';

const UserContext = createContext<User | null>(null);

export default function UserProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
