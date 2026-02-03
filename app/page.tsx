import Image from "next/image";
import Link from "next/link";

import bgImage from "@/public/bg.jpg";

export default function Page() {
  return (
    <main className="mt-24">
      <Image
        className="object-cover object-top"
        src={bgImage}
        fill
        placeholder="blur"
        quality={80}
        alt="Mountains and forests with two cabins"
      />

      <div className="relative z-10 text-center">
        <h1 className="text-7xl md:text-8xl text-primary-50 mb-14 tracking-tight text-shadow-[#58676C] text-shadow-lg/30 font-normal">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-yellow-400 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-yellow-500 border border-accent-300 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
