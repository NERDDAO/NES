"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import GameContainer from "~~/components/game/GameContainer";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex items-center flex-col  h-[50%] w-full max-h-screen pt-10 container mx-auto">
        <GameContainer />
      </div>
    </>
  );
};

export default Home;
