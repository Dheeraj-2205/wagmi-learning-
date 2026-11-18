import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia, mainnet],      // kaunsi chains support karni hain
  connectors: [injected()],        // browser wallet (MetaMask etc.)
  transports: {
    [sepolia.id]: http(),          // har chain ke liye RPC
    [mainnet.id]: http(),
  },
})