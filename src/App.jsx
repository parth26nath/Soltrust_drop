import './App.css';
import { Navbar,Welcome,Footer,Transactions,Services } from './components';
import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

import '@solana/wallet-adapter-react-ui/styles.css';


function App() {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
      <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={[]} autoConnect>
              <WalletModalProvider>
                <div className="min-h-screen">
                  <div className="gradient-bg-welcome">
                    <Navbar />
                    <Welcome />
                  </div>
                  <Services />
                  <Transactions />
                  <Footer />
              </div>
              </WalletModalProvider>
          </WalletProvider>
      </ConnectionProvider>
  );
}

export default App






