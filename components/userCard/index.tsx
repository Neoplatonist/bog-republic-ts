import React from "react";
import Link from "next/link";
import Image from "next/image";
import MoneySymbol from "@/components/moneySymbol";
import { useTypedSelector } from "@/libs/redux";
import { selectUserMycelium } from "@/libs/redux/user";

function UserCard() {
  const { mycelium, myceliumNotation } = useTypedSelector(selectUserMycelium);

  return (
    <div className='flex justify-center items-center sticky top-0 z-10 mb-4 p-4 bg-secondary shadow-custom'
      style={{
        filter: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))',
        // background: 'linear-gradient(0deg, rgba(221,229,182,1) 90%, rgba(108,88,76,1) 100%)',
      }}>

      {/* User Info */}
      <div className='flex flex-col flex-1 justify-between content-between'>

        {/* User Picture */}
        <div className='w-[100px] h-[100px] bg-neutral shadow-custom'>
          {/*
              You can click on the image to see your inventory.
              When receiving new items, the image border will blink a color.
            */}
          <Image
            src="/images/default-frog.png"
            alt="Default Frog"
            width={100}
            height={100}
            layout="fixed"
            priority
          />
        </div>

        {/* User Ranking */}
        <Link href='#user-rank' legacyBehavior>
          <a className='w-[100px] ms-0 me-0 pt-1 text-sm text-center underline underline-offset-[0.25em] decoration-neutral cursor-pointer hover:text-black hover:decoration-black hover:font-normal'
            title="Your ranking level">
            Neophyte
          </a>
        </Link>
      </div>

      {/* User Stats */}
      <div className='flex flex-col basis-full' style={{ flex: '2' }}>

        {/* User Mycelium */}
        <div className='flex flex-col h-[100px] px-4 py-2 justify-center bg-success'
          style={{
            border: '3px solid rgba(70, 63, 58, 0.1)',
            borderRadius: '10% 10% 5px 5px',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
          }}>

          <p className='p-0 ms-0 me-0 text-base text-center leading-5 font-semibold'>
            {MoneySymbol} Mycelium
            <br />
            <span className='text-2xl font-semibold'>{mycelium.toFixed(2)}e{myceliumNotation}</span>
          </p>

          {/* <div className='flex justify-between'>
              <button type='button' className='text-xs outline-dashed px-4'>Progress</button>
              <button type='button' className='text-xs outline-dashed px-4'>Accessories</button>
            </div> */}
        </div>

        {/* User Forest Growth */}
        <Link href="#forest-growth" legacyBehavior>
          <a
            className='ms-0 me-0 pt-1 text-center text-sm underline-offset-[0.25em] cursor-pointer hover:text-black hover:decoration-black hover:font-normal'
            title="How large your forest is"
          >
            <u>Forest Growth: coming soon</u>

            {/* <u>Forest Growth: 1542 m</u>
            <sup>2</sup> */}
          </a>
        </Link>
      </div>
    </div>
  );
}

export default UserCard;
