'use client';

import React, { MouseEvent } from "react";
import { getAuth, signOut } from 'firebase/auth';

function SignOutPage() {
  const handleLogout = (_event: MouseEvent<HTMLButtonElement>) => {
    _event.preventDefault();
    localStorage.clear();
    signOut(getAuth());
  };

  return <button
    type='button'
    className='btn btn-square btn-ghost'
    onClick={handleLogout}
  >
    SignOut
  </button>;
}

export default SignOutPage;
