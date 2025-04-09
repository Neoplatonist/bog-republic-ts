import React from 'react';
import Image from 'next/image';

type Props = {
  terrainName: string;
};

function ProfileImage({ terrainName }: Props) {
  return (
    <div
      className="max-w-[75px] max-h-[75px] bg-neutral rounded-full flex justify-center items-center border border-success shadow-custom"
      style={{
        filter:
          'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))',
      }}
    >
      <Image
        src="/images/terrain-toadstool.png"
        alt={terrainName}
        width={125}
        height={125}
        layout="fixed"
      />
    </div>
  );
}

export default ProfileImage;
