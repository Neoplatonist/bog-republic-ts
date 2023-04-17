import React from 'react';
import Image from 'next/image';

type Props = {
  terrainName: string;
};

function ProfileImage({ terrainName }: Props) {
  return (
    <div className='w-[70px] h-[70px] bg-neutral rounded-full flex justify-center items-center border border-success shadow-custom'
      style={{
        filter: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))'
      }}>
      <Image
        src="/images/terrain-toadstool.png"
        alt={terrainName}
        width={75}
        height={75}
        layout="fixed"
      />
    </div>
  );
}

export default ProfileImage;
