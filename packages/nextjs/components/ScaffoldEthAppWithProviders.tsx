"use client";

import { useEffect, useRef, useState } from "react";
import { MUDProvider } from "./mud/MUDContext";
import { setup } from "./mud/mud/setup";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import mudConfig from "contracts/mud.config";
import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import { WagmiProvider } from "wagmi";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { ProgressBar } from "~~/components/scaffold-eth/ProgressBar";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  const price = useNativeCurrencyPrice();
  const setNativeCurrencyPrice = useGlobalState(state => state.setNativeCurrencyPrice);

  useEffect(() => {
    if (price > 0) {
      setNativeCurrencyPrice(price);
    }
  }, [setNativeCurrencyPrice, price]);

  return (
    <>
      <div className="flex flex-col max-h-screen">
        <Header />
        <main className="relative flex flex-col flex-1">{children}</main>

        <Footer />
      </div>

      <ToastContainer position="bottom-right" draggable={false} theme="dark" />
      <Toaster />
    </>
  );
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const ScaffoldEthAppWithProviders = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false);
  const [result, setResult] = useState<any>(null);
  const hasInitializedRef = useRef(false);

  const mountDevTools = async (mudSetup: any) => {
    const { mount } = await import("@latticexyz/dev-tools");
    mount({
      config: mudConfig,
      publicClient: mudSetup.network.publicClient,
      walletClient: mudSetup.network.walletClient,
      latestBlock$: mudSetup.network.latestBlock$,
      storedBlockLogs$: mudSetup.network.storedBlockLogs$,
      worldAddress: mudSetup.network.worldContract.address,
      worldAbi: mudSetup.network.worldContract.abi,
      write$: mudSetup.network.write$,
      recsWorld: mudSetup.network.world,
    });
  };

  useEffect(() => {
    const initializeMUD = async () => {
      if (hasInitializedRef.current) return;
      hasInitializedRef.current = true;

      const result = await setup();
      setMounted(true);
      setResult(result);
      mountDevTools(result);
      console.log("initializeMUD", initializeMUD);
    };

    initializeMUD();
  }, []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ProgressBar />
        <RainbowKitProvider
          avatar={BlockieAvatar}
          theme={mounted ? (isDarkMode ? darkTheme() : lightTheme()) : lightTheme()}
        >
          {result ? (
            <MUDProvider value={result}>
              <ScaffoldEthApp>{children}</ScaffoldEthApp>
            </MUDProvider>
          ) : (
            <div>Loading...</div>
          )}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
