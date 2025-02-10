import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-slate-900 min-h-screen flex items-center justify-center">
        <Image
          src="/images/bog_republic_bg.jpeg"
          alt="Background"
          fill
          priority
          className="object-contain"
          quality={100}
        />

        <div className="absolute bottom-20 flex items-center justify-center">
          <Link 
            href="/login" 
            className="relative z-10 px-4 py-2 bg-white/80 rounded-lg hover:bg-white/90 transition-colors"
          >
            Login
          </Link>
        </div>
    </main>
  );
};