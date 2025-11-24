// src/pages/index.js
import Head from 'next/head';
import { Minter } from '../components/Minter';

export default function Home() {
  return (
    <>
      <Head>
        <title>Fairly Odd Fellas Minter</title>
        <meta name="description" content="PFP Minter dApp featuring dynamic pricing." />
      </Head>

      <main className="flex min-h-screen items-center justify-center p-6 sm:p-24 bg-gray-100">
        <Minter />
      </main>
    </>
  );
}
