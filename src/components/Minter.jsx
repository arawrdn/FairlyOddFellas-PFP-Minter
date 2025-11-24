// src/components/Minter.jsx
import React, { useState, useEffect } from 'react';
import { useAccount, useSendTransaction, useConnect } from 'wagmi';
import { PFP_NFT_CONTRACT_ADDRESS, MINT_PRICE_ETH, MINT_VALUE_WEI } from '../lib/web3/config';

// --- SIMULATED DATA FETCHING LOGIC ---
// In a production environment, this function would call an API service to fetch and aggregate
// a user's transaction volume across Ethereum and Base networks.
const fetchVolumeData = async (address) => {
  console.log(`Analyzing on-chain volume for: ${address} on Base/ETH...`);
  const totalVolume = 100 + Math.random() * 1400; // Simulated volume
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network latency
  return { totalVolume };
};

const getDisplayPriceTier = (totalVolume) => {
    if (totalVolume > 1000) return { price: 0.0005, tier: "Oddest Fella (VIP)" }; 
    if (totalVolume > 500) return { price: 0.001, tier: "Good Fella" };  
    return { price: 0.002, tier: "New Fella" };
};

export function Minter() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const [fellaTier, setFellaTier] = useState(null);
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);

  // Wagmi Hook for sending transaction
  const { data, isLoading: isSendingTx, sendTransaction } = useSendTransaction();

  // --- Dynamic Pricing Logic Execution ---
  useEffect(() => {
    if (address) {
      setIsLoadingPrice(true);
      fetchVolumeData(address).then(data => {
        const tier = getDisplayPriceTier(data.totalVolume);
        setFellaTier(tier);
        setIsLoadingPrice(false);
      });
    } else {
      setFellaTier(null);
    }
  }, [address]);

  // --- Mint Transaction Handler ---
  const handleMint = () => {
    if (!isConnected) {
      alert("Error: Wallet is not connected.");
      return;
    }
    
    // Executes the transaction with the required fixed ETH value
    sendTransaction({
      to: PFP_NFT_CONTRACT_ADDRESS,
      data: '0x1337', // Placeholder: Must be replaced with the actual encoded contract function call (e.g., abi.encodeFunctionData)
      value: MINT_VALUE_WEI,
    });
  };

  // Select the WalletConnect V2 connector
  const wcConnector = connectors.find(c => c.id === 'walletConnect'); 

  // --- Render Logic: Disconnected State ---
  if (!isConnected) {
    return (
      <div className="p-8 border rounded-xl shadow-2xl max-w-md mx-auto bg-white">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Fairly Odd Fellas Mint</h2>
        <p className="mb-6 text-gray-600 text-center">Connect your digital wallet to analyze your on-chain history and unlock your personalized Fella Tier.</p>
        <button
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition duration-150 shadow-md"
          onClick={() => connect({ connector: wcConnector })}
        >
          Connect Digital Wallet
        </button>
      </div>
    );
  }

  // --- Render Logic: Connected State ---
  return (
    <div className="p-8 border rounded-xl shadow-2xl max-w-lg mx-auto bg-white">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-purple-700">Fairly Odd Fellas Mint Engine</h2>
      <p className="text-sm text-gray-500 mb-6 text-center">Connected Address: {address.substring(0, 6)}...{address.slice(-4)}</p>

      {/* --- Dynamic Pricing Display --- */}
      <div className="bg-purple-50 p-5 rounded-xl border-2 border-purple-300 mb-6">
        <h3 className="text-xl font-semibold mb-2 text-purple-800">Your Fella Tier: {fellaTier?.tier || 'Analyzing...'}</h3>
        {isLoadingPrice ? (
          <p className="text-lg text-indigo-500 animate-pulse">Analyzing ETH and Base activity...</p>
        ) : (
          <>
            <p className="text-4xl font-black text-red-600 mb-3">
                {fellaTier ? `${fellaTier.price} ETH` : 'Price Tier TBD'}
            </p>
            <p className="text-sm text-gray-700">
                This is your visually displayed tier price, derived from our on-chain analysis.
            </p>
          </>
        )}
      </div>

      {/* --- Mint Action Section --- */}
      <div className="bg-green-100 p-5 rounded-xl border-2 border-green-300">
          <p className="text-lg font-bold mb-2 text-green-800">Final Transaction Value</p>
          <p className="text-3xl font-black text-green-700 mb-3">{MINT_PRICE_ETH} ETH</p>
          
          <button
              onClick={handleMint}
              disabled={isSendingTx || isLoadingPrice}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 mt-4 shadow-lg"
          >
              {isSendingTx ? 'Awaiting Wallet Confirmation...' : `Mint Your Fella Now`}
          </button>

          {data && (
            <p className="mt-4 text-sm text-green-800 break-words">Transaction Broadcasted! Hash: {data.hash}</p>
          )}
      </div>
    </div>
  );
}
