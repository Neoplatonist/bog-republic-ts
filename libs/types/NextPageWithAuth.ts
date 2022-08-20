import { NextPage } from 'next/types';

export type NextPageWithAuth<P = any, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean | undefined;
};
