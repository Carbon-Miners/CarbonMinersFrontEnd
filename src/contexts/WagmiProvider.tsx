'use client'

import React from 'react'
import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lineaSepolia, mainnet } from 'wagmi/chains'
import { http, createConfig } from 'wagmi'
// import { injected, walletConnect, metaMask } from 'wagmi/connectors'
// import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import '@rainbow-me/rainbowkit/styles.css'

const projectId = 'xxx'
const config = createConfig({
  chains: [lineaSepolia, mainnet],
  connectors: [
    // injected(),
    // walletConnect({ projectId }),"https://rpc.sepolia.linea.build/"
    // metaMask(),
    // safe(),
  ],
  transports: {
    // [anvil.id]: http(),
    [mainnet.id]: http(),
    [lineaSepolia.id]: http("https://linea-sepolia.infura.io/v3/848cf931324945a3a7b063cbe69372c4"),
  },
})

const queryClient = new QueryClient()

export default function WagmiConfigProvider(props: { children?: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{props.children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
