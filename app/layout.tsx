'use client';

import React, { ReactElement } from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from '@/libs/redux';
import '../styles/globals.css';

interface Props {
  children: ReactElement;
}

const HomeLayout = ({ children }: Props) => (
  <html lang='en'>
    <body>
      <Head>
        <title>Bog Republic</title>
        <meta name='description' content='Get your Bog on!' />
        <meta name='keywords' content='bog republic, bog, idle clicker' />
        {/* <link rel='icon' href='/favicon.ico' /> */}
      </Head>

      <Provider store={store}>
        {children}
      </Provider>
    </body>
  </html>
);

export default HomeLayout;
