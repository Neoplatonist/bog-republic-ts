import React, { FC, MouseEvent, ReactNode } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getAuth, signOut } from 'firebase/auth';
import { useTypedSelector } from '@/libs/redux';
import { selectUser } from '@/libs/redux/user';

type Props = {
  children: ReactNode;
};

const GameLayout: FC<Props> = ({ children }) => {
  const router = useRouter();

  // Redux Selectors
  const user = useTypedSelector(selectUser);

  // ---------------------------------- User Actions ----------------------------------
  // Logs the user out
  const handleLogout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    signOut(getAuth())
      .then(() => router.push('/')); // Redirects to the home page
  };

  return (
    <>
      {/* Header */}
      <header className="navbar bg-success shadow-custom" style={{
        filter: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))',
      }}>
        <div className='flex-1'>
          <Link href="/game" legacyBehavior>
            <a className='btn btn-ghost normal-case text-xl'>
              Bog Republic
            </a>
          </Link>
        </div>

        {/* User Stats Card */}
        <div className='flex-none'>
          <p>{user && user.username} the Frog</p>

          <button
            type='button'
            className='btn btn-square btn-ghost'
            onClick={handleLogout}
          >
            X
          </button>
        </div>
      </header>

      <div style={{ flex: '1' }}>
        {children}
      </div>

      {/* Footer */}
      <footer>
        <p>MycoMushroom Footer</p>
      </footer>
    </>
  );
};

export default GameLayout;
