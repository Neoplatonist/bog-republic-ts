import React from 'react';
import Image from 'next/image';

type ProfileImageProps = {
  terrainName: string;
  terrainImg: string;
};

function ProfileImage({ terrainName, terrainImg }: ProfileImageProps) {
  return (
    <div className='w-[100px] h-[100px] bg-neutral rounded-l-3xl flex justify-center items-center border border-success shadow-custom'
      style={{
        filter: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))'
      }}>
      <Image
        src={terrainImg}
        alt={terrainName}
        loading='lazy'
        width={100}
        height={100}
      />
    </div>
  );
}

export default ProfileImage;
