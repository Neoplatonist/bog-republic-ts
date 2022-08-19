import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';

const Home: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>Bog Republic</title>
      <meta name="description" content="Work your way through the Bog!" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <header className={styles.header}>
      <Link href="/login" passHref>
        <a>Create User</a>
      </Link>

      <br />

      <Link href="/login" passHref>
        <a>Login</a>
      </Link>
    </header>

    <main className={styles.main}>
      <h1 className={styles.title}>
        Welcome to the Bog Republic!
      </h1>

      <p className={styles.description}>
        Get started by signing up or logging in with the links above.

        <br />

        You can use your Google or Facebook account.
      </p>
    </main>

    <footer className={styles.footer}>
      Built with &hearts; by AstroLogic Dev &copy; 2021 - {new Date().getFullYear()}
    </footer>
  </div >
);

export default Home;
