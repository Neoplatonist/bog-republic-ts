'use client';

import { store } from '@/libs/redux';
import TerrainsApi from '@/libs/redux/terrains/api';

async function GetTerrains() {
  await store.dispatch(TerrainsApi.endpoints.getTerrains.initiate(''));
}

export default GetTerrains;
