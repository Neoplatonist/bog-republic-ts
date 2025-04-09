'use client';

import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useUser } from '@/libs/contexts/UserProvider';
import { useGetTerrainsQuery } from '@/libs/redux/terrains/api';
import { useGetUserTerrainsQuery } from '@/libs/redux/userTerrains/api';
import { hydrateUser } from '@/libs/redux/user';
import { hydrateTerrains } from '@/libs/redux/terrains';
import { hydrateUserTerrains } from '@/libs/redux/userTerrains';
// import UserCard from '@/components/UserCard';
import { useGetUserQuery } from '@/libs/redux/user/api';
import DashboardContent from './content';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const hankoUser = useUser();

  const hasHydratedUser = useRef(false);
  const hasHydratedTerrains = useRef(false);
  const hasHydratedUserTerrains = useRef(false);

  const {
    data: user,
    // isLoading: userLoading,
    // isSuccess: isUserSuccess,
    // isFetching: isUserFetching,
    // isUninitialized: isUserUninitialized,
    currentData: userCurrentData,
  } = useGetUserQuery('', {
    refetchOnMountOrArgChange: false,
  });
  const {
    data: terrains,
    isLoading: terrainsLoading,
    // isSuccess: isTerrainsSuccess,
    // isFetching: isTerrainsFetching,
    // isUninitialized: isTerrainsUninitialized,
    currentData: terrainsCurrentData,
  } = useGetTerrainsQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });
  const {
    data: userTerrains,
    isLoading: userTerrainsLoading,
    // isSuccess: isUserTerrainsSuccess,
    // isFetching: isUserTerrainsFetching,
    // isUninitialized: isUserTerrainsUninitialized,
    currentData: userTerrainsCurrentData,
  } = useGetUserTerrainsQuery(undefined);

  useEffect(() => {
    const userData = user || userCurrentData;
    console.log({ userData });
    if (userData && !hasHydratedUser.current) {
      dispatch(hydrateUser({ data: userData, errors: null }));
      hasHydratedUser.current = true;
    }
  }, [dispatch, user, userCurrentData]);

  useEffect(() => {
    const terrainsData = terrains || terrainsCurrentData;
    if (terrainsData && !hasHydratedTerrains.current) {
      dispatch(hydrateTerrains({ data: terrainsData, errors: null }));
      hasHydratedTerrains.current = true;
    }
  }, [dispatch, terrains, terrainsCurrentData]);

  useEffect(() => {
    const userTerrainsData = userTerrains || userTerrainsCurrentData;
    console.log({ userTerrainsData });
    if (userTerrainsData && !hasHydratedUserTerrains.current) {
      dispatch(hydrateUserTerrains({ data: userTerrainsData, errors: null }));
      hasHydratedUserTerrains.current = true;
    }
  }, [dispatch, userTerrains, userTerrainsCurrentData]);

  if (!hankoUser) {
    return <div>Not logged in</div>;
  }

  if (terrainsLoading || userTerrainsLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg bg-blue-50 p-4 text-blue-800">
          <h3 className="font-semibold">Loading...</h3>
          <p>Fetching terrain data</p>
        </div>
      </div>
    );
  }

  if (
    (!terrains && !terrainsLoading) ||
    (!userTerrains && !userTerrainsLoading)
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg bg-red-50 p-4 text-red-800">
          <h3 className="font-semibold">No terrain data available</h3>
          <p>Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="sm:p-5 xl:p-24">
      {/* <div>User id: {user.id}</div>
      <div>User email: {user.email}</div>
      <div>User Name: {user.username}</div> */}

      <DashboardContent />
    </div>
  );
};

export default DashboardPage;
