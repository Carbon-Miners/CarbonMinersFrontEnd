import { http, createConfig } from '@wagmi/core'
import { lineaSepolia } from '@wagmi/core/chains'
export const wagmiConfig = createConfig({
  chains: [lineaSepolia],
  transports: {
    [lineaSepolia.id]: http("https://linea-sepolia.infura.io/v3/848cf931324945a3a7b063cbe69372c4")
  },
})