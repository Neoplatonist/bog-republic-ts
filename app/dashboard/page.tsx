import React from 'react';
import { fetchCurrentUser } from '@/libs/fetchCurrentUser';
import dynamic from 'next/dynamic';
// import { useUserData } from "@/hooks/useUserData";
// import { useSessionData } from "@/hooks/useSessionData";

const HankoProfile = dynamic(() => import('@/components/hanko/HankoProfile'), { ssr: true });

const DashboardPage = async () => {
  const user = await fetchCurrentUser();
  console.info(user);

  const {
    id,
    email,
    username
  } = user;

  // const { id, email, loading: userDataLoading, error: userDataError } = useUserData();
  // const { userID, jwt, isValid, loading: sessionDataLoading, error: sessionDataError } = useSessionData();

  // if (userDataLoading) {
  //   return <div>Loading...</div>;
  // }

  if (!user) {
    return <div>Not logged in</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>User id: {id}</div>
      <div>User email: {email}</div>
      <div>User Name: {username}</div>
      <HankoProfile />
    </div>
  );
};

export default DashboardPage;