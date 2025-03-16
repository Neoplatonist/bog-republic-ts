'use client';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useUser } from '@/libs/contexts/UserProvider';
import { useGetTerrainsQuery } from '@/libs/redux/terrains/api';
import { useGetUserTerrainsQuery } from '@/libs/redux/userTerrains/api';
import { hydrateTerrains } from '@/libs/redux/terrains';
import { hydrateUserTerrains } from '@/libs/redux/userTerrains';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const user = useUser();

  const {
    data: terrains,
    isLoading: terrainsLoading,
    isSuccess: isTerrainsSuccess,
    // isFetching: isTerrainsFetching,
    // isUninitialized: isTerrainsUninitialized,
    // currentData: terrainsCurrentData,
  } = useGetTerrainsQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });
  const {
    data: userTerrains,
    isLoading: userTerrainsLoading,
    isSuccess: isUserTerrainsSuccess,
    // isFetching: isUserTerrainsFetching,
    // isUninitialized: isUserTerrainsUninitialized,
    // currentData: userTerrainsCurrentData,
  } = useGetUserTerrainsQuery('', {
    refetchOnMountOrArgChange: false,
  });
  // console.log({
  //   terrains: {
  //     data: terrains,
  //     loading: terrainsLoading,
  //     fetching: isTerrainsFetching,
  //     uninitialized: isTerrainsUninitialized,
  //     currentData: terrainsCurrentData,
  //   },
  //   userTerrains: {
  //     data: userTerrains,
  //     loading: userTerrainsLoading,
  //     fetching: isUserTerrainsFetching,
  //     uninitialized: isUserTerrainsUninitialized,
  //     currentData: userTerrainsCurrentData,
  //   },
  // });

  useEffect(() => {
    if (isTerrainsSuccess && terrains) {
      dispatch(hydrateTerrains({ data: terrains, errors: null }));
    }
  }, [dispatch, isTerrainsSuccess, terrains]);

  useEffect(() => {
    if (isUserTerrainsSuccess && userTerrains) {
      dispatch(hydrateUserTerrains({ data: userTerrains, errors: null }));
    }
  }, [dispatch, isUserTerrainsSuccess, userTerrains]);

  if (!user) {
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
    <div className="p-24">
      <div>User id: {user.id}</div>
      <div>User email: {user.email}</div>
      <div>User Name: {user.username}</div>
    </div>
  );
};

export default DashboardPage;
