'use client';

import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/libs/redux';
import type { Store } from '@reduxjs/toolkit';
// import { useTypedSelector } from '@/libs/redux';

// export const DebugCache = () => {
//   const cache = useTypedSelector((state) => state.clientApi);

//   return (
//     <div className="fixed bottom-4 right-4 w-96 max-h-[50vh] flex flex-col rounded-lg bg-gray-800 p-4 text-xs text-white opacity-75 hover:opacity-100 transition-opacity overflow-hidden">
//       <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600">
//         <pre className="whitespace-pre-wrap">
//           {JSON.stringify(cache, null, 2)}
//         </pre>
//       </div>
//     </div>
//   );
// };

interface ReduxProviderProps {
  children: React.ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  const storeRef = useRef<Store | null>(null);
  if (!storeRef.current) {
    storeRef.current = store;
  }

  return (
    <Provider store={storeRef.current}>
      {children}
      {/* {process.env.NODE_ENV === 'development' && <DebugCache />} */}
    </Provider>
  );
}
