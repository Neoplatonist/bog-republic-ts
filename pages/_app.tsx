/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { NextPageWithAuth } from '@/libs/types';
import AuthGuard from '@/libs/firebase/components/AuthGuard';
import { wrapper } from '@/libs/redux';
import '../styles/globals.css';

function MyApp({
  Component,
  pageProps
}: {
  Component: NextPageWithAuth;
  pageProps: any;
}) {
  if (Component.requireAuth) {
    return (
      <AuthGuard>
        <Component {...pageProps} />
      </AuthGuard>
    );
  }

  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
