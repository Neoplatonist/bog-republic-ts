'use client';

import React, { useEffect } from 'react';
import type User from '@/libs/contexts/userType';
import ReduxProvider from '@/libs/contexts/ReduxProvider';
import UserProvider from '@/libs/contexts/UserProvider';

export default function DashboardWrapper({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  // store the user in localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('hankoUser', JSON.stringify(user));
    }
  }, [user]);

  return (
    <ReduxProvider>
      <UserProvider user={user}>{children}</UserProvider>
    </ReduxProvider>
  );
}
