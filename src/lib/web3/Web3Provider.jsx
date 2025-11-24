// src/lib/web3/Web3Provider.jsx
import React, { useState, useEffect } from 'react';
import { WagmiConfig } from 'wagmi';
import { AppKitProvider } from '@reown/appkit-adapter-wagmi';
import { appKit, wagmiConfig } from './config';

/**
 * Global provider wrapper to establish the Web3 context using Wagmi and AppKit.
 * All application components gain access to wallet state and actions through this provider.
 */
export function Web3Provider({ children }) {
  const [ready, setReady] = useState(false);
  
  // Ensures the component only renders client-side after mounting
  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <WagmiConfig config={wagmiConfig}>
      <AppKitProvider appKit={appKit}>
        {children}
      </AppKitProvider>
    </WagmiConfig>
  );
}
