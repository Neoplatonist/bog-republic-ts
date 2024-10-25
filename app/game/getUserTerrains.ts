'use client';

import { store } from '@/libs/redux';
import UserTerrainsApi from '@/libs/redux/userTerrains/api';

async function GetUserTerrains() {
  await store.dispatch(UserTerrainsApi.endpoints.getUserTerrains.initiate(''));
}

export default GetUserTerrains;
