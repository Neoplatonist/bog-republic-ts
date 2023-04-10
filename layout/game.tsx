import React, { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

// eslint-disable-next-line arrow-body-style
const GameLayout: FC<Props> = ({ children }) => {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {children}
    </>
  );
};

export default GameLayout;
