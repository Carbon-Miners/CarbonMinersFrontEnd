'use client'

import React from 'react'
import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mainnet, anvil, sepolia } from 'wagmi/chains'
import { http, createConfig } from 'wagmi'
// import { injected, walletConnect, metaMask } from 'wagmi/connectors'
// import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import '@rainbow-me/rainbowkit/styles.css'

const projectId = 'xxx'
const config = createConfig({
  chains: [anvil, sepolia],
  connectors: [
    // injected(),
    // walletConnect({ projectId }),
    // metaMask(),
    // safe(),
  ],
  transports: {
    [anvil.id]: http(),
    // [mainnet.id]: http(),
    [sepolia.id]: http("https://eth-sepolia.g.alchemy.com/v2/-SRymV4bA08HcL1DulqFxNPTgMftEopr"),
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
