"use client";

import React, { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import type { Hanko as HankoType } from "@teamhanko/hanko-elements";
 
const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL!;
const backendApi = process.env.NEXT_PUBLIC_backendAPI!;
 
export default function HankoAuth() {
  const router = useRouter();
  const [hanko, setHanko] = useState<HankoType>();
 
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Dynamic import of both Hanko and register
      import('@teamhanko/hanko-elements').then(({ Hanko, register }) => {
        setHanko(new Hanko(hankoApi));
        register(hankoApi).catch((error) => {
          console.error('Registration error:', error);
        });
      });
    }
  }, []);

  const getJwtToken = async () => {
    const response = await fetch('/api/auth/token');
    if (!response.ok) {
      throw new Error('Failed to get JWT');
    }

    const { token } = await response.json();
    return token;
  };

  const checkUserInBackend = async (jwt: string) => {
    try {
      const response = await fetch(`${backendApi}/users/login`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwt}`,
        },
      });

      if (!response.ok) {
        throw new Error('User not found in backend');
      }

      return true;
    } catch (error) {
      console.error('Backend validation failed:', error);
      return false;
    }
  };
 
  const redirectAfterLogin = useCallback(async () => {
    // successfully logged in, redirect to a page in your application
    try {
      const jwt = await getJwtToken();
      const userExists = await checkUserInBackend(jwt);

      if (userExists) {
        router.replace("/dashboard");
      } else {
        await hanko?.user.logout();
        router.replace("/login");
      }
    } catch (error) {
      console.error('Authentication error:', error);
      await hanko?.user.logout();
      router.replace("/login");
    }
  }, [router, hanko]);
 
  useEffect(
    () =>
      hanko?.onSessionCreated(() => {
        redirectAfterLogin();
      }),
    [hanko, redirectAfterLogin]
  );
 
  // @ts-ignore
  return <hanko-auth />;
}
