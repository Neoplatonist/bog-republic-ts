import React from 'react';
import { NextPage } from 'next/types';
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';
 
export const metadata: Metadata = {
  title: 'My Page Title',
  description: 'Work your way through the Bog!',
  icons: {
    icon: '/favicon.ico',
  }
};

const HomePage: NextPage = () => (
  <div className={styles.container}>
    <header className={styles.header}>
      <h1 className={styles.title}>
        Welcome to the Bog Republic!
      </h1>
    </header>

    <main className={styles.main}>
      <Link href="/login" passHref>
        <button type='button' className='btn btn-primary shadow-custom border-2 border-gray-500 text-3xl font-semibold -mt-24 px-10 py-5 h-24'>
          Play Now!
        </button>
      </Link>
    </main>

    <footer className={styles.footer}>
      Built with &hearts; by AstroLogic Dev &copy; 2021 - {new Date().getFullYear()}
    </footer>
  </div >
);

export default HomePage;
