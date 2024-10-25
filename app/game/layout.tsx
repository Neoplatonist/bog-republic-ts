'use client';

import React, { ReactNode } from 'react';
import AuthGuard from '@/libs/firebase/components/AuthGuard';
// import GetTerrains from './getTerrains';
// import GetUserTerrains from './getUserTerrains';
import { useGetTerrainsQuery } from '@/libs/redux/terrains/api';
import { useGetUserTerrainsQuery } from '@/libs/redux/userTerrains/api';
import GameHeader from './header';

interface GameLayoutProps {
  children: ReactNode;
};

function GameLayout({ children }: GameLayoutProps) {
  useGetTerrainsQuery('');
  useGetUserTerrainsQuery('');

  return (
    <AuthGuard>
      <>
        {/* Header */}
        <GameHeader />

        <div style={{ flex: '1' }}>
          {children}
        </div>

        {/* Footer */}
        <footer>
          <p>MycoMushroom Footer</p>
        </footer>
      </>
    </AuthGuard>
  );
};

export default GameLayout;
