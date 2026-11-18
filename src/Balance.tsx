import { useConnection, useConnect, useConnectors, useDisconnect, useBalance } from 'wagmi'
import { formatEther } from 'viem'

export default function Balance() {
  const { address, isConnected, chain } = useConnection()
  const connectors = useConnectors()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  const { data: balance, isPending ,refetch } = useBalance({ address })


  if (!isConnected) {
    return (
      <div>
        {connectors.map((c) => (
          <button key={c.uid} onClick={() => connect({ connector: c })}>
            Connect {c.name}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div>
      <p>Address: {address}</p>
      <p>Chain: {chain?.name}</p>
      <p>
        Balance: {isPending ? 'loading...' : `${formatEther(balance!.value)} ETH`}
      </p>
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  )
}