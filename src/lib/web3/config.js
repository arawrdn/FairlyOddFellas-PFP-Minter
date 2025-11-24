import { createConfig, http, mainnet, sepolia } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { getDefaultConfig } from '@reown/appkit-adapter-wagmi'; 
import { AppKit } from '@reown/appkit';
import { parseEther } from 'viem';

// --- CONTRACT & MINT CONFIGURATION ---
export const MINT_PRICE_ETH = 0.0007;
export const MINT_VALUE_WEI = parseEther(MINT_PRICE_ETH.toString());

// NFT Contract Address (CA)
export const PFP_NFT_CONTRACT_ADDRESS = '0x049ee6d2249c242611e1b704f0babaa8157d69eb'; 

export const PFP_NFT_ABI = [
  // Minimal ABI for a payable mint function
  {
    "name": "mint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
];

// --- WALLET CONNECT V2.0 CONFIGURATION ---
const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID;

// Define chains supported by the application
const chains = [mainnet, base, sepolia, baseSepolia];

// 1. Configure Wagmi using AppKit's recommended default settings
export const wagmiConfig = createConfig({
  chains: chains,
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL),
    [base.id]: http(process.env.NEXT_PUBLIC_BASE_RPC_URL),
  },
  connectors: getDefaultConfig({
    appName: 'Fairly Odd Fellas Minter',
    projectId: projectId,
    chains: chains,
  }),
});

// 2. Initialize AppKit for provider management
export const appKit = new AppKit({
    projectId,
    chains, 
    metadata: {
        name: 'Fairly Odd Fellas PFP Minter',
        description: 'NFT minting platform with on-chain analysis.',
        url: '[https://fof-minter.com](https://fof-minter.com)', 
        icons: ['[https://fof-minter.com/logo.png](https://fof-minter.com/logo.png)']
    }
});
