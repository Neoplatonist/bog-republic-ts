'use client';

import React, { MouseEvent } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useTypedSelector } from '@/libs/redux';
import { selectUser } from '@/libs/redux/user';

function HeaderUser() {
  const user = useTypedSelector(selectUser);

  const handleLogout = (_event: MouseEvent<HTMLButtonElement>) => {
    _event.preventDefault();
    localStorage.clear();
    signOut(getAuth());
  };

  return (
    <>
      <p>{user && user.username} the Frog</p>

      <button
        type='button'
        className='btn btn-square btn-ghost'
        onClick={handleLogout}
      >
        X
      </button>
    </>
  );
}

export default HeaderUser;
