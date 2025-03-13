import React from 'react';
import { fetchCurrentUser } from '@/libs/fetchCurrentUser';
import DashboardWrapper from './wrapper';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await fetchCurrentUser();

  return (
    <DashboardWrapper user={user}>
      <div>GameHeader</div>

      <div style={{ flex: '1' }}>{children}</div>

      <footer>
        <p>MycoMushroom Footer</p>
      </footer>
    </DashboardWrapper>
  );
}
