import React from 'react';
import Link from 'next/link';
import HeaderUser from './headerUser';

/**
 * Getting the user's data from the database should be in the AuthGuard component.
 * That way we can ensure that data is ready before reaching this page.
 * Plus this allows the use of server components for parts of the page.
 */

function GameHeader() {
  return (
    <header className='navbar bg-success shadow-custom' style={{
      filter: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))',
    }}>
      <Link prefetch={false} passHref href='/game/dashboard' className='flex-1 btn btn-ghost normal-case text-xl'>
        Bog Republic
      </Link>

      {/* User - Needs to be put in a menu component */}
      <div className='flex-none'>
        <HeaderUser />
      </div>
    </header >
  );
};

export default GameHeader;
