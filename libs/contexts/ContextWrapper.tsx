'use client';

import React from 'react';
import ReduxProvider from '@/libs/contexts/ReduxProvider';
import UserProvider from '@/libs/contexts/UserProvider';
import type User from '@/libs/contexts/userType';

interface ClientWrapperProps {
  children: React.ReactNode;
  user: User;
}

export default function ClientWrapper({ children, user }: ClientWrapperProps) {
  return (
    <ReduxProvider>
      <UserProvider user={user}>{children}</UserProvider>
    </ReduxProvider>
  );
}
