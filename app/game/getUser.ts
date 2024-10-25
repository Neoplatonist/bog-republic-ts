'use client';

import { store } from '@/libs/redux';
import UserApi from '@/libs/redux/user/api';

async function GetUser() {
  await store.dispatch(UserApi.endpoints.getUser.initiate(''));
}

export default GetUser;
