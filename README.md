# FairlyOddFellas-PFP-Minter-Advanced

A high-quality, full-stack client application for the Fairly Odd Fellas PFP NFT collection. This project demonstrates best practices in modern decentralized application (dApp) development, leveraging the power of WalletConnect V2.0 for secure, multi-chain user connectivity.

## ✨ Core Features

* **Robust Wallet Integration:** Implements WalletConnect V2.0 via the AppKit ecosystem, ensuring seamless connectivity across major wallets on desktop and mobile.
* **On-Chain Analysis Logic:** Features a front-end module that simulates the analysis of a user's cumulative transaction volume across **Ethereum (L1)** and **Base (L2)** to determine a personalized "Fella Tier."
* **Fixed-Rate Minting:** Executes the final NFT mint transaction at a precise, fixed cost of **$0.0007 \text{ ETH}$**.
* **Target Smart Contract:** Interaction with the deployed NFT Contract at `0x049ee6d2249c242611e1b704f0babaa8157d69eb`.

## 🛠️ Technical Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js (React) | Server-side rendering and routing |
| **Connectivity** | `@reown/appkit` & Wagmi | Wallet provider management (using WalletConnect V2.0 internally) |
| **Blockchain** | Ethers.js (via Wagmi) | Contract interaction and transaction signing |
| **Styling** | Tailwind CSS | Utility-first CSS framework (requires setup) |

## 🚀 Setup and Installation

### Prerequisites
* Node.js (v18+)

### Configuration

Create a `.env.local` file in the root directory.
